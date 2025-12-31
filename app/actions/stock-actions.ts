'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { StockDataWithInput } from '@/types';
import { StocksPatchSchema, StocksSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { handleActionsError } from '@/lib/handle-actions-error';
import { Prisma } from '@prisma/client';

export async function getStocks() {
  try {
    const items = await prisma.item_name.findMany({
      include: { stock: true },
    });
    const itemsAsString = itemsFromBigintToString(items);
    const itemsParsed = StocksSchema.parse(itemsAsString);

    const stockDataWithInput: StockDataWithInput[] = (itemsParsed ?? []).map((item) => ({
      ...item,
      stockInInput: item.stock?.stock_count !== undefined ? String(item.stock.stock_count) : '0',
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
            item_name_id: itemId,
          },
          include: { item_name: true },
        });
        const oldValue = current?.stock_count ?? 0;
        const itemName = current?.item_name?.item_name ?? '不明な商品';
        if (oldValue !== count) {
          await tx.logs.create({
            data: {
              log_message: `[在庫数]${itemName} : ${oldValue} => ${count}へ変更しました`,
            },
          });
        }
        await tx.stock.upsert({
          where: {
            item_name_id: itemId,
          },
          update: {
            stock_count: count,
          },
          create: {
            item_name_id: itemId,
            stock_count: count,
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
