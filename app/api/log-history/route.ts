import { handleApiError } from '@/lib/handle-api-error';
import { prisma } from '@/lib/prisma';
import { LogsSchema } from '@/schemas/api/log-history';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: {
        logged_at: 'desc',
      },
    });
    const itemsAsString = itemsFromBigintToString(logs);
    const itemsParsed = LogsSchema.parse(itemsAsString);
    return NextResponse.json({ logsData: itemsParsed });
  } catch (err) {
    handleApiError(err);
  }
}
