import { z } from 'zod';
import { ItemSchema } from '../commons';

export const StockItemSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  stocktable: true,
});

export const ArrayStockItemSchema = z.array(StockItemSchema);

export const StockSendSchema = z.array(
  z.object({
    itemname_id: z.number(),
    stock_count: z.number().min(0),
  }),
);
