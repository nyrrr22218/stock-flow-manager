import Tab4 from '@/components/tab/tab4/tab-4';
import { prisma } from '@/lib/prisma';
import { ArrayItemnameTableSchema } from '@/schemas/api/tab-4';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';

export default async function page() {
  const items = await prisma.item_name.findMany();

  const serialized = itemsFromBigintToString(items);
  const parsedData = ArrayItemnameTableSchema.parse(itemsFromBigintToString(serialized));
  return <Tab4 Tab4Data={parsedData} />;
}
