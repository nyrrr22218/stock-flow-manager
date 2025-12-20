import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas/api/tab5';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const logs = await prisma.logtable.findMany({
      orderBy: {
        logged_at: 'desc',
      },
    });
    const serialized = logs.map((log) => ({
      ...log,
      id: log.id.toString(),
      logged_at: log.logged_at.toISOString(),
    }));
    const parsedData = ArrayLogTableSchema.parse(serialized);
    return NextResponse.json({ logsData: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}
