import { TItem } from '@/schemas/commons';

type TItemProduct = Pick<TItem, 'id' | 'item_name' | 'producttable'>;

export type TItemProductAndInput = TItemProduct & { productedInInput: string };

export type TProductSend = {
  id: number;
  productedInInput: string;
};
