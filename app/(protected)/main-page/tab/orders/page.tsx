import Tab1 from '@/components/tab/orders/orders';
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

  return <Tab1 ordersData={parsedData} />;
}
