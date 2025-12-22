import Tab3 from '@/components/tab/tab3/tab-3';
import { prisma } from '@/lib/prisma';
import { ArrayProductItemSchema } from '@/schemas/api/tab-3';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';

export default async function page() {
  const items = await prisma.item_name.findMany({
    include: {
      product: true,
    },
  });

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayProductItemSchema.parse(itemsFromBigintToString(serialized));

  return <Tab3 tab3Data={parsedData} />;
}
