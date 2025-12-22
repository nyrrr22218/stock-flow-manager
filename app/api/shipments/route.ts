import { TItemAndInputSchema } from '@/schemas/commons';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = TItemAndInputSchema.parse(body.items ?? []);
    const shipmentItems: { id: string; name: string; count: number }[] = [];
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const ordercount = Number(item.orderInInput) || 0;
        const productcount = item.product?.producted_count ?? 0;
        const stockcount = item.stock?.stock_count ?? 0;
        const finalDataNumber = productcount + stockcount - ordercount;
        if (finalDataNumber < 0) {
          throw new Error(`「${item.item_name}」の在庫が不足しています`);
        }
        await tx.stock.upsert({
          where: {
            item_name_id: itemid,
          },
          update: {
            stock_count: finalDataNumber,
          },
          create: {
            item_name_id: itemid,
            stock_count: finalDataNumber,
          },
        });
        await tx.order.update({
          where: {
            item_name_id: itemid,
          },
          data: {
            order_count: 0,
          },
        });
        await tx.product.update({
          where: {
            item_name_id: itemid,
          },
          data: {
            producted_count: 0,
          },
        });
        if (ordercount > 0) {
          shipmentItems.push({
            id: item.id,
            name: item.item_name,
            count: ordercount,
          });
        }
      }
      if (shipmentItems.length > 0) {
        const shippingLogs = shipmentItems
          .map((item) => `${item.name}: ${item.count}枚`)
          .join(' / ');
        await tx.logs.create({
          data: { log_message: `[出荷完了] 内容:${shippingLogs}` },
        });
        await tx.shipments.create({
          data: {
            order_snapshot: shipmentItems,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
