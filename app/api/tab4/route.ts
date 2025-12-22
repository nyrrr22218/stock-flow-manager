import { prisma } from '@/lib/prisma';
import { AddItemSchema, ArrayItemnameTableSchema } from '@/schemas/api/tab-4';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany();
    const parsedData = ArrayItemnameTableSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({
      items: parsedData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { item_name } = AddItemSchema.parse(body);
    const newItem = await prisma.$transaction(async (tx) => {
      return await tx.item_name.create({
        data: {
          item_name: item_name,
          order: { create: { order_count: 0 } },
          stock: { create: { stock_count: 0 } },
          product: { create: { producted_count: 0 } },
        },
        include: {
          order: true,
          stock: true,
          product: true,
        },
      });
    });
    return NextResponse.json({
      success: true,
      newItem: itemsFromBigintToString(newItem),
    });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: err.message },
        { status: 400 },
      );
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return NextResponse.json({ error: 'その名前は既に使用されています' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.item_name.delete({
      where: {
        id: BigInt(id),
      },
    });
    return NextResponse.json({ message: 'ok', success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
