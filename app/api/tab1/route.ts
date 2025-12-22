import { prisma } from '@/lib/prisma';
import { ArrayItemSchema, PatchOrderSchema } from '@/schemas/api/tab-1';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany({
      include: {
        order: true,
        product: true,
        stock: true,
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
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const count =
          item.orderInInput === undefined || item.orderInInput === ''
            ? 0
            : Number(item.orderInInput);
        const current = await tx.order.findUnique({
          where: { item_name_id: itemid },
          include: { item_name: true },
        });
        const oldValue = current?.order_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[注文数]${itemName}を${oldValue}から${count}に変更しました`,
            },
          });
        }
        await tx.order.upsert({
          where: {
            item_name_id: itemid,
          },
          update: {
            order_count: count,
          },
          create: {
            item_name_id: itemid,
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
