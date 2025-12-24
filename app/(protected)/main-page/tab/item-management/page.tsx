import ItemManagement from '@/components/tab/item-management/item-add';
import { prisma } from '@/lib/prisma';
import { ItemNamesSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function ItemManagementPage() {
  const items = await prisma.item_name.findMany();
  const itemsAsString = itemsFromBigintToString(items);
  const itemsParsed = ItemNamesSchema.parse(itemsAsString);

  return <ItemManagement itemNameData={itemsParsed} />;
}
