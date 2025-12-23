import Tab2 from '@/components/tab/stocks/stocks';
import { prisma } from '@/lib/prisma';
import { ArrayStockItemSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function Page() {
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
    },
  });

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayStockItemSchema.parse(itemsFromBigintToString(serialized));

  return <Tab2 stocksData={parsedData} />;
}
