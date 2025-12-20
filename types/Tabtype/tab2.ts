import { TItem } from '@/schemas/commons';

type TItemStock = Pick<TItem, 'id' | 'item_name' | 'stocktable'>;

export type TItemStockAndInput = TItemStock & { stockInInput: string };

export type TStockSend = {
  id: string;
  stockInInput: string;
};
