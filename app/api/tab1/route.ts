import { prisma } from '@/lib/prisma';
import { ItemSchema } from '@/schemas/commons';
import { TItemAndInput } from '@/types/Tabtype/tab1';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const items = await prisma.itemnametable.findMany({
      include: {
        ordertable: true,
        producttable: true,
        stocktable: true,
      },
    });
    const parsedData = z.array(ItemSchema).parse(items);
    return NextResponse.json({ items: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const items: TItemAndInput[] = body.items;
    const itemsToSave = items.map((item) => ({
      itemname_id: BigInt(item.id),
      order_count: item.orderInInput === undefined ? 0 : Number(item.orderInInput),
    }));
    await prisma.$transaction(
      itemsToSave.map((item) =>
        prisma.ordertable.upsert({
          where: {
            itemname_id: BigInt(item.itemname_id),
          },
          update: {
            order_count: item.order_count ? Number(item.order_count) : undefined,
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
