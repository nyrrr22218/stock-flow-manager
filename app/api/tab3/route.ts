import { NextResponse } from 'next/server';
import { ArrayProductItemSchema, PatchProductSchema } from '@/schemas/api/tab3';
import { prisma } from '@/lib/prisma';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';

export async function GET() {
  try {
    const items = await prisma.itemnametable.findMany({
      include: {
        producttable: true,
      },
    });
    const parsedData = ArrayProductItemSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({
      items: parsedData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsedData = PatchProductSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const count =
          item.productedInInput === undefined || item.productedInInput === ''
            ? 0
            : Number(item.productedInInput);
        const current = await tx.producttable.findUnique({
          where: {
            itemname_id: itemid,
          },
          include: {
            itemnametable: true,
          },
        });
        const oldValue = current?.producted_count ?? 0;
        const itemName = current?.itemnametable?.item_name ?? '不明な商品';

        if (oldValue !== count) {
          await tx.logtable.create({
            data: {
              logs: `[Tab3]${itemName}を${oldValue}から${count}に変更しました`,
            },
          });
        }
        await tx.producttable.upsert({
          where: {
            itemname_id: itemid,
          },
          update: {
            producted_count: count,
          },
          create: {
            itemname_id: itemid,
            producted_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
