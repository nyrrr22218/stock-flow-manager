import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { StocksSchema, StocksPatchSchema } from '@/schemas/api/stocks';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany({
      include: {
        stock: true,
      },
    });
    const itemsParsed = StocksSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({ items: itemsParsed });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const itemsParsed = StocksPatchSchema.parse(body.items ?? []);
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
    return NextResponse.json({ success: true });
  } catch (err) {
    return handleApiError(err);
  }
}
