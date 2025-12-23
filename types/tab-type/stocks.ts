import { TItem } from '@/schemas/commons';

export type TItemStock = Pick<TItem, 'id' | 'item_name' | 'stock'>;

export type TItemStockAndInput = TItemStock & { stockInInput: string };

export type TStockSend = {
  id: string;
  stockInInput: string;
};
