// axiosの使用方法のために置いておく

import { NextResponse } from 'next/server';
import { ProductsSchema, ProductsPatchSchema } from '@/schemas/api/produced-count';
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
    const itemsParsed = ProductsSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({
      items: itemsParsed,
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const itemsParsed = ProductsPatchSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.producedInInput) || 0;
        const current = await tx.product.findUnique({
          where: {
            item_name_id: itemId,
          },
          include: {
            item_name: true,
          },
        });
        const oldValue = current?.produced_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';

        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[生産数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.product.upsert({
          where: {
            item_name_id: itemId,
          },
          update: {
            produced_count: count,
          },
          create: {
            item_name_id: itemId,
            produced_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return handleApiError(err);
  }
}
