'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';

import { ItemDataWithInputSchema } from '@/schemas';
import type { ItemDataWithInput, ShippingResult, ShippingUpdatedItems } from '@/types';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function shippingCompleted(
  ordersPageList: ItemDataWithInput[],
): Promise<ShippingResult> {
  try {
    const itemsParsed = ItemDataWithInputSchema.parse(ordersPageList ?? []);

    const itemsShipment: { id: string; name: string; count: number }[] = [];
    const shippingUpdatedItems: ShippingUpdatedItems[] = [];

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const orderCount = Number(item.orderInInput) || 0;
        const productCount = item.producedCount?.producedCount ?? 0;
        const stockCount = item.stock?.stockCount ?? 0;
        // 最終不足数 = 生産数 + 在庫数 - 注文数
        const finalCount = productCount + stockCount - orderCount;

        if (finalCount < 0) {
          throw new Error(`「${item.name}」の出荷数が不足しています`);
        }
        await tx.stock.upsert({
          where: { itemName_id: itemId },
          update: { stockCount: finalCount },
          create: { itemName_id: itemId, stockCount: finalCount },
        });
        await tx.order.update({
          where: { itemName_id: itemId },
          data: { orderCount: 0 },
        });
        await tx.producedCount.update({
          where: { itemName_id: itemId },
          data: { producedCount: 0 },
        });
        // 注文があった商品を配列として保持
        if (orderCount > 0) {
          itemsShipment.push({
            id: item.id,
            name: item.name,
            count: orderCount,
          });
        }
        // 返り値として表示するdata
        shippingUpdatedItems.push({
          id: item.id,
          stock: { stockCount: finalCount },
          order: { orderCount: 0 },
          producedCount: { producedCount: 0 },
        });
      }
      // log保存,shipmentstableへ追加
      if (itemsShipment.length > 0) {
        const shippingLogs = itemsShipment
          .map((item) => `${item.name}: ${item.count}枚`)
          .join(' / ');
        await tx.log.create({
          data: { logMessage: `[出荷完了] 内容 : ${shippingLogs}` },
        });
        await tx.shipment.create({
          data: {
            orderSnapshot: itemsShipment,
          },
        });
      }
    });
    revalidatePath('/main-page/tab/orders');
    return { success: true, shippingUpdatedItems };
  } catch (error) {
    const err = handleActionsError(error, 'shippingCompleted');
    return {
      success: false,
      error: err.error || '出荷処理中に予期せぬエラーが発生しました',
    };
  }
}
