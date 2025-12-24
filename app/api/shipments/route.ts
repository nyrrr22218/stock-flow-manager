import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ItemDataWithInputSchema } from '@/schemas';
import { handleApiError } from '@/lib/handle-api-error';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itemsParsed = ItemDataWithInputSchema.parse(body.items ?? []);
    const itemsShipment: { id: string; name: string; count: number }[] = [];
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const orderCount = Number(item.orderInInput) || 0;
        const productCount = item.product?.producted_count ?? 0;
        const stockCount = item.stock?.stock_count ?? 0;
        const finalCount = productCount + stockCount - orderCount;
        if (finalCount < 0) {
          throw new Error(`「${item.item_name}」の出荷数が不足しています`);
        }
        await tx.stock.upsert({
          where: {
            item_name_id: itemId,
          },
          update: {
            stock_count: finalCount,
          },
          create: {
            item_name_id: itemId,
            stock_count: finalCount,
          },
        });
        await tx.order.update({
          where: {
            item_name_id: itemId,
          },
          data: {
            order_count: 0,
          },
        });
        await tx.product.update({
          where: {
            item_name_id: itemId,
          },
          data: {
            producted_count: 0,
          },
        });
        if (orderCount > 0) {
          itemsShipment.push({
            id: item.id,
            name: item.item_name,
            count: orderCount,
          });
        }
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
    return NextResponse.json({ success: true });
  } catch (err) {
    handleApiError(err);
  }
}
