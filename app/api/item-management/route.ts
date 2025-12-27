import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { ItemNameAddSchema, ItemNamesSchema } from '@/schemas/api/item-management';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const itemsAsString = await prisma.item_name.findMany();
    const itemsParsed = ItemNamesSchema.parse(itemsFromBigintToString(itemsAsString));
    return NextResponse.json({
      items: itemsParsed,
    });
  } catch (err) {
    handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { item_name } = ItemNameAddSchema.parse(body);
    const newItem = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const item = await tx.item_name.create({
        data: {
          item_name,
          order: { create: { order_count: 0 } },
          stock: { create: { stock_count: 0 } },
          product: { create: { produced_count: 0 } },
        },
        include: {
          order: true,
          stock: true,
          product: true,
        },
      });
      await tx.logs.create({
        data: {
          log_message: `[商品]${item_name} を追加しました`,
        },
      });
      return item;
    });
    return NextResponse.json({
      success: true,
      newItem: itemsFromBigintToString(newItem),
    });
  } catch (err) {
    handleApiError(err);
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, itemName } = await req.json();
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      return (
        await tx.item_name.delete({
          where: {
            id: BigInt(id),
          },
        }),
        await tx.logs.create({
          data: {
            log_message: `[商品]${itemName} を削除しました`,
          },
        })
      );
    });
    return NextResponse.json({ message: 'ok', success: true });
  } catch (err) {
    handleApiError(err);
  }
}
