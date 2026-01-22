import type { Item } from '@/schemas/commons';

type ProducedCount = Pick<Item, 'id' | 'name' | 'producedCount'>;

export type ProducedCountDataWithInput = ProducedCount & { producedInInput: string };
