import Graph from '@/components/tab/graph/graph';
import { prisma } from '@/lib/prisma';
import { ItemsSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

export default async function GraphPage() {
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
      order: true,
      product: true,
    },
  });

  const itemsAsString = itemsFromBigintToString(items);
  const itemsParsed = ItemsSchema.parse(itemsAsString);

  return <Graph graphData={itemsParsed} />;
}
