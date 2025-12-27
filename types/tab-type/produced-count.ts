import { Item } from '@/schemas/commons';

export type ProductsCount = Pick<Item, 'id' | 'item_name' | 'product'>;

export type ProducedCountDataWithInput = ProductsCount & { producedInInput: string };

export type ProducedCountToSend = {
  id: string;
  producedInInput: string;
};
