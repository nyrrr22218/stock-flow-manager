import Tab6 from '@/components/tab/tab6/tab-6';
import { prisma } from '@/lib/prisma';
import { ArrayItemSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

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

  return <Tab6 tab1Data={parsedData} />;
}
