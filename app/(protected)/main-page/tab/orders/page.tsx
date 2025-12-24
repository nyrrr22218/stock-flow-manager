import Orders from '@/components/tab/orders/orders';
import { prisma } from '@/lib/prisma';
import { ItemsSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function OrdersPage() {
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
      order: true,
      product: true,
    },
  });

  const itemsAsString = itemsFromBigintToString(items);
  const itemsParsed = ItemsSchema.parse(itemsAsString);

  return <Orders orderData={itemsParsed} />;
}
