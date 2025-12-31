'use server';

import { handleActionsError } from '@/lib/handle-actions-error';
import { prisma } from '@/lib/prisma';
import { ItemNameAddSchema, ItemNamesSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type DeleteResult = { success: true; error?: never } | { success: false; error: string };

export async function getItems() {
  try {
    const itemsAsString = await prisma.item_name.findMany();
    const itemsParsed = ItemNamesSchema.parse(itemsFromBigintToString(itemsAsString));
    return itemsParsed;
  } catch (error) {
    return handleActionsError(error, 'getItems');
  }
}

export async function postItem(newItemName: string) {
  try {
    const { item_name } = ItemNameAddSchema.parse({ item_name: newItemName });
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
    revalidatePath('/main-page/tab/item-management');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'postItem');
  }
}

export async function deleteItem(id: string, itemName: string): Promise<DeleteResult> {
  try {
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
    revalidatePath('/main-page/tab/item-management');
    return { success: true };
  } catch (error) {
    const err = handleActionsError(error, 'deleteItem');
    return {
      success: false,
      error: err.error || '商品削除中に予期せぬエラーが発生しました',
    };
  }
}
