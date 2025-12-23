import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { AddItemSchema, ArrayItemnameTableSchema } from '@/schemas/api/item-add';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.item_name.findMany();
    const parsedData = ArrayItemnameTableSchema.parse(itemsFromBigintToString(items));
    return NextResponse.json({
      items: parsedData,
    });
  } catch (err) {
    handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { item_name } = AddItemSchema.parse(body);
    const newItem = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
  } catch (err) {
    handleApiError(err);
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
  } catch (err) {
    handleApiError(err);
  }
}
