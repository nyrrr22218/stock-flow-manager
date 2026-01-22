'use server';

import { prisma } from '@/lib/prisma';
import { handleActionsError } from '@/lib/handle-actions-error';
import { itemsFromBigintToString } from '@/utils/items-from-bigint-to-string';

import { LogsSchema } from '@/schemas/api/log-history';

export async function getLogs() {
  try {
    const logs = await prisma.log.findMany({
      orderBy: {
        loggedAt: 'desc',
      },
    });
    const itemsAsString = itemsFromBigintToString(logs);
    const itemsParsed = LogsSchema.parse(itemsAsString);
    return itemsParsed;
  } catch (error) {
    return handleActionsError(error, 'getLogs');
  }
}
