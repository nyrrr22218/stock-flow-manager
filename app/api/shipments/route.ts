import { TItemAndInputSchema } from '@/schemas/commons';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = TItemAndInputSchema.parse(body.items ?? []);
    const shipmentItems: { id: string; name: string; count: number }[] = [];
    await prisma.$transaction(async (tx) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const ordercount = Number(item.orderInInput) || 0;
        const productcount = item.producttable?.producted_count ?? 0;
        const stockcount = item.stocktable?.stock_count ?? 0;
        const finalDataNumber = productcount + stockcount - ordercount;
        if (finalDataNumber < 0) {
          throw new Error(`「${item.item_name}」の在庫が不足しています`);
        }
        await tx.stocktable.upsert({
          where: {
            itemname_id: itemid,
          },
          update: {
            stock_count: finalDataNumber,
          },
          create: {
            itemname_id: itemid,
            stock_count: finalDataNumber,
          },
        });
        await tx.ordertable.update({
          where: {
            itemname_id: itemid,
          },
          data: {
            order_count: 0,
          },
        });
        await tx.producttable.update({
          where: {
            itemname_id: itemid,
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
        await tx.logtable.create({
          data: { logs: `[出荷完了] 内容:${shippingLogs}` },
        });
        await tx.shipmentstable.create({
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
