import { NextResponse } from 'next/server';
import { ArrayProductItemSchema, PatchProductSchema } from '@/schemas/api/products';
import { prisma } from '@/lib/prisma';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { Prisma } from '@prisma/client';
import { handleApiError } from '@/lib/handle-api-error';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany({
      include: {
        product: true,
      },
    });
    const parsedData = ArrayProductItemSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({
      items: parsedData,
    });
  } catch (err) {
    handleApiError(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsedData = PatchProductSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of parsedData) {
        const itemid = BigInt(item.id);
        const count =
          item.productedInInput === undefined || item.productedInInput === ''
            ? 0
            : Number(item.productedInInput);
        const current = await tx.product.findUnique({
          where: {
            item_name_id: itemid,
          },
          include: {
            item_name: true,
          },
        });
        const oldValue = current?.producted_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';

        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[生産数]${itemName}を${oldValue}から${count}に変更しました`,
            },
          });
        }
        await tx.product.upsert({
          where: {
            item_name_id: itemid,
          },
          update: {
            producted_count: count,
          },
          create: {
            item_name_id: itemid,
            producted_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    handleApiError(err);
  }
}
