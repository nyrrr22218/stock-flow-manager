import type { Item } from '@/schemas/commons';

type ProductsCount = Pick<Item, 'id' | 'item_name' | 'product'>;

export type ProducedCountDataWithInput = ProductsCount & { producedInInput: string };
