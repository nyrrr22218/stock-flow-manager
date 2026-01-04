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
        const productCount = item.product?.produced_count ?? 0;
        const stockCount = item.stock?.stock_count ?? 0;
        // 最終不足数 = 生産数 + 在庫数 - 注文数
        const finalCount = productCount + stockCount - orderCount;

        if (finalCount < 0) {
          throw new Error(`「${item.item_name}」の出荷数が不足しています`);
        }
        await tx.stock.upsert({
          where: { item_name_id: itemId },
          update: { stock_count: finalCount },
          create: { item_name_id: itemId, stock_count: finalCount },
        });
        await tx.order.update({
          where: { item_name_id: itemId },
          data: { order_count: 0 },
        });
        await tx.product.update({
          where: { item_name_id: itemId },
          data: { produced_count: 0 },
        });
        if (orderCount > 0) {
          itemsShipment.push({
            id: item.id,
            name: item.item_name,
            count: orderCount,
          });
        }
        shippingUpdatedItems.push({
          id: item.id,
          stock: { stock_count: finalCount },
          order: { order_count: 0 },
          product: { produced_count: 0 },
        });
      }
      if (itemsShipment.length > 0) {
        const shippingLogs = itemsShipment
          .map((item) => `${item.name}: ${item.count}枚`)
          .join(' / ');
        await tx.logs.create({
          data: { log_message: `[出荷完了] 内容 : ${shippingLogs}` },
        });
        await tx.shipments.create({
          data: {
            order_snapshot: itemsShipment,
          },
        });
      }
    });
    revalidatePath('/main-page/tab/orders');
    return { success: true, shippingUpdatedItems };
  } catch (error) {
    const err = handleActionsError(error, 'completeShipping');
    return {
      success: false,
      error: err.error || '出荷処理中に予期せぬエラーが発生しました',
    };
  }
}
