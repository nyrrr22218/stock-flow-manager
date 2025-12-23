import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas/api/log-history';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
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
    handleApiError(err);
  }
}
