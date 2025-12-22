// app/main-page/tab/tab-1/page.tsx
import Tab1 from '@/components/tab/tab1/tab-1';
import { prisma } from '@/lib/prisma'; // サーバーから直接DBを呼ぶ

export default async function Page() {
  // 1. fetchを使わず、直接DBから取得（これが一番速い）
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
      order: true,
      product: true,
    },
  });

  // 2. BigIntを文字列に変換（APIと同じシリアライズ）
  const serialized = JSON.parse(
    JSON.stringify(items, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );

  return <Tab1 tab1Data={serialized} />;
}
