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
    const items = await prisma.item_name.findMany({
      include: {
        order: true,
        product: true,
        stock: true,
      },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = ItemsSchema.parse(itemsAsString);

    const orderDataWithInput: ItemDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
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
    revalidatePath('/main-page/tab/orders');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'patchOrders');
  }
}
