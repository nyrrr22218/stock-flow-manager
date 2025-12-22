import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas/api/tab-5';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: {
        logged_at: 'desc',
      },
    });
    const serialized = itemsFromBigintToString(logs);
    const parsedData = ArrayLogTableSchema.parse(serialized);
    return NextResponse.json({ logsData: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}
