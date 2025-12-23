import Tab4 from '@/components/tab/tab4/tab-4';
import { prisma } from '@/lib/prisma';
import { ArrayItemnameTableSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function Page() {
  const items = await prisma.item_name.findMany();

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayItemnameTableSchema.parse(itemsFromBigintToString(serialized));
  return <Tab4 Tab4Data={parsedData} />;
}
