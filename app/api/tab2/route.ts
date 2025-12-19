import { prisma } from '@/lib/prisma';
import { ArrayStockItemSchema } from '@/schemas/api/tab2';
import { TStockSend } from '@/schemas/commons';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.itemnametable.findMany({
      include: {
        stocktable: true,
      },
    });
    const parsedData = ArrayStockItemSchema.parse(items);
    return NextResponse.json({ items: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const items: TStockSend[] = body.items;
    const itemsToSave = items.map((item) => ({
      itemname_id: BigInt(item.id),
      stock_count: item.stockInInput === undefined ? 0 : Number(item.stockInInput),
    }));
    await prisma.$transaction(
      itemsToSave.map((item) =>
        prisma.stocktable.upsert({
          where: {
            itemname_id: BigInt(item.itemname_id),
          },
          update: {
            stock_count: item.stock_count ? Number(item.stock_count) : undefined,
          },
          create: item,
        }),
      ),
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
