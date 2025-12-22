import Tab1 from '@/components/tab/tab1/tab-1';
import { prisma } from '@/lib/prisma';
import { ArrayItemSchema } from '@/schemas/api/tab-1';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';

export default async function Page() {
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
      order: true,
      product: true,
    },
  });

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayItemSchema.parse(itemsFromBigintToString(serialized));

  return <Tab1 tab1Data={parsedData} />;
}
