import Tab5 from '@/components/tab/tab5/tab-5';
import { prisma } from '@/lib/prisma';
import { ArrayLogTableSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function Page() {
  const logs = await prisma.logs.findMany({
    orderBy: {
      logged_at: 'desc',
    },
  });
  const serialized = itemsFromBigintToString(logs);
  const parsedData = ArrayLogTableSchema.parse(serialized);
  return <Tab5 Tab5Data={parsedData} />;
}
