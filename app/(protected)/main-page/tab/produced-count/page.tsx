import ProducedCount from '@/components/tab/produced-count/products';
import { prisma } from '@/lib/prisma';
import { ProductsSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

export default async function ProducedCountPage() {
  const items = await prisma.item_name.findMany({
    include: {
      product: true,
    },
  });

  const itemsAsString = itemsFromBigintToString(items);
  const itemsParsed = ProductsSchema.parse(itemsAsString);

  return <ProducedCount productData={itemsParsed} />;
}
