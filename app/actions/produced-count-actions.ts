'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import type { ProducedCountDataWithInput } from '@/types';
import { ProducedCountsPatchSchema, ProducedCountsSchema } from '@/schemas';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export async function getProducts() {
  try {
    const items = await prisma.itemName.findMany({
      include: { producedCount: true },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = ProducedCountsSchema.parse(itemsAsString);

    const productDataWithInput: ProducedCountDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      producedInInput: String(item.producedCount?.producedCount ?? '0'),
    }));

    return productDataWithInput;
  } catch (error) {
    return handleActionsError(error, 'getProducts');
  }
}

export async function patchProducts(producedCountList: ProducedCountDataWithInput[]) {
  try {
    const itemsParsed = ProducedCountsPatchSchema.parse(producedCountList ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.producedInInput) || 0;
        const current = await tx.producedCount.findUnique({
          where: {
            itemName_id: itemId,
          },
          include: { ItemName: true },
        });
        const oldValue = current?.producedCount ?? 0;
        const itemName = current?.ItemName?.name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.log.create({
            data: {
              logMessage: `[生産数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.producedCount.upsert({
          where: {
            itemName_id: itemId,
          },
          update: {
            producedCount: count,
          },
          create: {
            itemName_id: itemId,
            producedCount: count,
          },
        });
      }
    });
    revalidatePath('/main-page/tab/produced-count');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'patchProducts');
  }
}
