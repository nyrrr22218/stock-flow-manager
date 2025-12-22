import { prisma } from '@/lib/prisma';
import { ArrayStockItemSchema, PatchStockSchema } from '@/schemas/api/tab-2';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany({
      include: {
        stock: true,
      },
    });
    const parsedData = ArrayStockItemSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({ items: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsedData = PatchStockSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const count =
          item.stockInInput === undefined || item.stockInInput === ''
            ? 0
            : Number(item.stockInInput);
        const current = await tx.stock.findUnique({
          where: {
            item_name_id: itemid,
          },
          include: { item_name: true },
        });
        const oldValue = current?.stock_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[在庫数]${itemName}を${oldValue}から${count}に変更しました`,
            },
          });
        }
        await tx.stock.upsert({
          where: {
            item_name_id: itemid,
          },
          update: {
            stock_count: count,
          },
          create: {
            item_name_id: itemid,
            stock_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
