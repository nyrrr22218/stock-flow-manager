import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas/api/tab-5';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: {
        logged_at: 'desc',
      },
    });
    const logList = logs.map((log) => ({
      ...log,
      id: log.id.toString(),
      logged_at: log.logged_at.toISOString(),
    }));
    const parsedData = ArrayLogTableSchema.parse(logList);
    return NextResponse.json({ logsData: parsedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}
