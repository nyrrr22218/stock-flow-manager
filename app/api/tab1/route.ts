import { prisma } from '@/lib/prisma';
import { ArrayItemSchema, PatchOrderSchema } from '@/schemas/api/tab1';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.itemnametable.findMany({
      include: {
        ordertable: true,
        producttable: true,
        stocktable: true,
      },
    });
    const parsedData = ArrayItemSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({ items: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsedData = PatchOrderSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const count =
          item.orderInInput === undefined || item.orderInInput === ''
            ? 0
            : Number(item.orderInInput);
        const current = await tx.ordertable.findUnique({
          where: { itemname_id: itemid },
          include: { itemnametable: true },
        });
        const oldValue = current?.order_count ?? 0;
        const itemName = current?.itemnametable?.item_name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.logtable.create({
            data: {
              logs: `[Tab1]${itemName}を${oldValue}から${count}に変更しました`,
            },
          });
        }
        await tx.ordertable.upsert({
          where: {
            itemname_id: itemid,
          },
          update: {
            order_count: count,
          },
          create: {
            itemname_id: itemid,
            order_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
