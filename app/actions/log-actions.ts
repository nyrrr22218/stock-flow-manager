'use server';

import { handleActionsError } from '@/lib/handle-actions-error';
import { prisma } from '@/lib/prisma';
import { LogsSchema } from '@/schemas/api/log-history';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

export async function getLogs() {
  try {
    const logs = await prisma.logs.findMany({
      orderBy: {
        logged_at: 'desc',
      },
    });
    const itemsAsString = itemsFromBigintToString(logs);
    const itemsParsed = LogsSchema.parse(itemsAsString);
    return itemsParsed;
  } catch (error) {
    return handleActionsError(error, 'getLogs');
  }
}
