import Tab5 from '@/components/tab/tab5/tab-5';
import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas/api/tab-5';
import { itemsFromBigintToString } from '@/utils/itemsFromBigintToString';

export default async function page() {
  const logs = await prisma.logs.findMany({
    orderBy: {
      logged_at: 'desc',
    },
  });
  const serialized = itemsFromBigintToString(logs);
  const parsedData = ArrayLogTableSchema.parse(serialized);
  return <Tab5 Tab5Data={parsedData} />;
}
