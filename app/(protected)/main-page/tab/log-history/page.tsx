import LogHistory from '@/components/tab/log-history/log-history';
import { prisma } from '@/lib/prisma';
import { LogsSchema } from '@/schemas';
import { itemsFromBigintToString } from '@/utils';

export default async function LogsPage() {
  const logs = await prisma.logs.findMany({
    orderBy: {
      logged_at: 'desc',
    },
  });
  const itemsAsString = itemsFromBigintToString(logs);
  const itemsParsed = LogsSchema.parse(itemsAsString);
  return <LogHistory logData={itemsParsed} />;
}
