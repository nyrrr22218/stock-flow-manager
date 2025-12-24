import { Item } from '@/schemas/commons';

export type ProductedCount = Pick<Item, 'id' | 'item_name' | 'product'>;

export type ProductedCountDataWithInput = ProductedCount & { productedInInput: string };

export type ProductedCountToSend = {
  id: string;
  productedInInput: string;
};
