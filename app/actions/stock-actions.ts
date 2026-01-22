'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import type { StockDataWithInput } from '@/types';
import { StocksPatchSchema, StocksSchema } from '@/schemas';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getStocks() {
  try {
    const items = await prisma.itemName.findMany({
      include: { stock: true },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = StocksSchema.parse(itemsAsString);

    const stockDataWithInput: StockDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      stockInInput: String(item.stock?.stockCount ?? '0'),
    }));

    return stockDataWithInput;
  } catch (error) {
    return handleActionsError(error, 'getStocks');
  }
}

export async function patchStocks(stockList: StockDataWithInput[]) {
  try {
    const itemsParsed = StocksPatchSchema.parse(stockList ?? []);
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      for (const item of itemsParsed) {
        const itemId = BigInt(item.id);
        const count = Number(item.stockInInput) || 0;
        const current = await tx.stock.findUnique({
          where: {
            itemName_id: itemId,
          },
          include: { ItemName: true },
        });
        const oldValue = current?.stockCount ?? 0;
        const itemName = current?.ItemName?.name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.log.create({
            data: {
              logMessage: `[在庫数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.stock.upsert({
          where: {
            itemName_id: itemId,
          },
          update: {
            stockCount: count,
          },
          create: {
            itemName_id: itemId,
            stockCount: count,
          },
        });
      }
    });
    revalidatePath('/main-page/tab/stocks');
    return { success: true };
  } catch (error) {
    return handleActionsError(error, 'patchStocks');
  }
}
