'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import type { ProducedCountDataWithInput } from '@/types';
import { ProductsPatchSchema, ProductsSchema } from '@/schemas';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export async function getProducts() {
  try {
    const items = await prisma.item_name.findMany({
      include: { product: true },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = ProductsSchema.parse(itemsAsString);

    const productDataWithInput: ProducedCountDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      producedInInput: String(item.product?.produced_count ?? '0'),
    }));

    return productDataWithInput;
  } catch (error) {
    return handleActionsError(error, 'getProducts');
  }
}

export async function patchProducts(producedCountList: ProducedCountDataWithInput[]) {
  try {
    const itemsParsed = ProductsPatchSchema.parse(producedCountList ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.producedInInput) || 0;
        const current = await tx.product.findUnique({
          where: {
            item_name_id: itemId,
          },
          include: { item_name: true },
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
    revalidatePath('/main-page/tab/produced-count');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'patchProducts');
  }
}
