import Stocks from '@/components/tab/stocks/stocks';
import { prisma } from '@/lib/prisma';
import { StocksSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function StocksPage() {
  const items = await prisma.item_name.findMany({
    include: {
      stock: true,
    },
  });

  const itemsAsString = itemsFromBigintToString(items);
  const itemsParsed = StocksSchema.parse(itemsAsString);

  return <Stocks stockData={itemsParsed} />;
}
