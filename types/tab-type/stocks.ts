import type { Item } from '@/schemas/commons';

type Stock = Pick<Item, 'id' | 'item_name' | 'stock'>;

export type StockDataWithInput = Stock & { stockInInput: string };
