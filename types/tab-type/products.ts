import { TItem } from '@/schemas/commons';

export type TItemProduct = Pick<TItem, 'id' | 'item_name' | 'product'>;

export type TItemProductAndInput = TItemProduct & { productedInInput: string };

export type TProductSend = {
  id: string;
  productedInInput: string;
};
