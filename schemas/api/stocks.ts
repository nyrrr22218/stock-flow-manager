import { z } from 'zod';
import { ItemSchema } from '../commons';

export const StockSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  stock: true,
});

export const StocksSchema = z.array(StockSchema);

export const StocksPatchSchema = z.array(
  z.object({
    id: z.string(),
    stockInInput: z.string().min(0),
  }),
);
