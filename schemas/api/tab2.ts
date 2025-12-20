import { z } from 'zod';
import { ItemSchema } from '../commons';

export const StockItemSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  stocktable: true,
});

export const ArrayStockItemSchema = z.array(StockItemSchema);

export const PatchStockSchema = z.array(
  z.object({
    id: z.string(),
    stockInInput: z.string().min(0),
  }),
);
