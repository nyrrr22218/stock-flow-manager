import { ItemSchema } from '../commons';

import { z } from 'zod';

const StockSchema = ItemSchema.pick({
  id: true,
  name: true,
  stock: true,
});

export const StocksSchema = z.array(StockSchema);

export const StocksPatchSchema = z.array(
  z.object({
    id: z.string(),
    stockInInput: z.string().min(0),
  }),
);
