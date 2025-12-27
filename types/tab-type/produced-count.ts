import { Item } from '@/schemas/commons';

export type ProductsCount = Pick<Item, 'id' | 'item_name' | 'product'>;

export type ProducedCountDataWithInput = ProductsCount & { producedInInput: string };
