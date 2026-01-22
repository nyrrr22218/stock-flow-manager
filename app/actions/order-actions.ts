'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import type { ItemDataWithInput } from '@/types';
import { ItemsSchema, OrdersPatchSchema } from '@/schemas';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
  try {
    const items = await prisma.itemName.findMany({
      include: {
        order: true,
        producedCount: true,
        stock: true,
      },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = ItemsSchema.parse(itemsAsString);

    const orderDataWithInput: ItemDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      orderInInput: String(item.order?.orderCount ?? '0'),
    }));

    return orderDataWithInput;
  } catch (error) {
    return handleActionsError(error, 'getOrders');
  }
}

export async function patchOrders(ordersPageList: ItemDataWithInput[]) {
  try {
    const itemsParsed = OrdersPatchSchema.parse(ordersPageList ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.orderInInput) || 0;
        const current = await tx.order.findUnique({
          where: { itemName_id: itemId },
          include: { ItemName: true },
        });
        const oldValue = current?.orderCount ?? 0;
        const itemName = current?.ItemName?.name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.log.create({
            data: {
              logMessage: `[注文数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.order.upsert({
          where: {
            itemName_id: itemId,
          },
          update: {
            orderCount: count,
          },
          create: {
            itemName_id: itemId,
            orderCount: count,
          },
        });
      }
    });
    revalidatePath('/main-page/tab/orders');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'patchOrders');
  }
}
