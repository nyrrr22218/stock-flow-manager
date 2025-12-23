import Tab3 from '@/components/tab/products/products';
import { prisma } from '@/lib/prisma';
import { ArrayProductItemSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function Page() {
  const items = await prisma.item_name.findMany({
    include: {
      product: true,
    },
  });

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayProductItemSchema.parse(itemsFromBigintToString(serialized));

  return <Tab3 productsData={parsedData} />;
}
