'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import { ItemNameAddSchema, ItemNamesSchema } from '@/schemas';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getItems() {
  try {
    const itemsAsString = await prisma.itemName.findMany();
    const itemsParsed = ItemNamesSchema.parse(itemsFromBigintToString(itemsAsString));
    return itemsParsed;
  } catch (error) {
    return handleActionsError(error, 'getItems');
  }
}

export async function postItem(newItemName: string) {
  try {
    const { name } = ItemNameAddSchema.parse({ ItemName: newItemName });
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const item = await tx.itemName.create({
        data: {
          name,
          order: { create: { orderCount: 0 } },
          stock: { create: { stockCount: 0 } },
          producedCount: { create: { producedCount: 0 } },
        },
        include: {
          order: true,
          stock: true,
          producedCount: true,
        },
      });
      await tx.log.create({
        data: {
          logMessage: `[商品]${name} を追加しました`,
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

export async function deleteItem(id: string, itemName: string) {
  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      return (
        await tx.itemName.delete({
          where: {
            id: BigInt(id),
          },
        }),
        await tx.log.create({
          data: {
            logMessage: `[商品]${itemName} を削除しました`,
          },
        })
      );
    });
    revalidatePath('/main-page/tab/item-management');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'deleteItem');
  }
}
