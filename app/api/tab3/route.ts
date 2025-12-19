import createsupabaseServerClient from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';
import { ArrayProductItemSchema, ProductSendSchema } from '@/schemas/api/tab3';
import { TProductSend } from '@/types/Tabtype/tab3';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.itemnametable.findMany({
      include: {
        producttable: true,
      },
    });
    const parsedData = ArrayProductItemSchema.parse(items);
    return NextResponse.json({
      items: parsedData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'miss' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const supabase = await createsupabaseServerClient();
  try {
    const body = await req.json();
    const items: TProductSend[] = body.items;
    const itemsToSave = ProductSendSchema.parse(
      items.map((item) => ({
        itemname_id: item.id,
        producted_count: item.productedInInput === '' ? 0 : Number(item.productedInInput),
      })),
    );
    const { error } = await supabase
      .from('product')
      .upsert(itemsToSave, { onConflict: 'itemname_id' });
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
