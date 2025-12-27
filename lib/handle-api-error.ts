import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const handleApiError = (err: unknown) => {
  console.error(err);
  if (err instanceof ZodError) {
    return NextResponse.json(
      { error: 'Invalid request data', details: err.flatten().fieldErrors },
      { status: 400 },
    );
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const target = (err.meta?.target as string[])?.join(', ') || '項目';
        return NextResponse.json({ error: `その${target}は既に使用されています` }, { status: 409 });
      }
      case 'P2025':
        return NextResponse.json({ error: '対象のデータが見つかりませんでした' }, { status: 404 });
    }
  }
  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
};
