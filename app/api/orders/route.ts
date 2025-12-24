import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { ItemsSchema, OrdersPatchSchema } from '@/schemas/api/orders';
import { itemsFromBigintToString } from '@/utils';
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
    const itemsParsed = ItemsSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({ items: itemsParsed });
  } catch (err) {
    handleApiError(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const itemsParsed = OrdersPatchSchema.parse(body.items ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.orderInInput) || 0;
        const current = await tx.order.findUnique({
          where: { item_name_id: itemId },
          include: { item_name: true },
        });
        const oldValue = current?.order_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[注文数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.order.upsert({
          where: {
            item_name_id: itemId,
          },
          update: {
            order_count: count,
          },
          create: {
            item_name_id: itemId,
            order_count: count,
          },
        });
      }
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    handleApiError(err);
  }
}
