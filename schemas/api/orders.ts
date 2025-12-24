import { z } from 'zod';
import { ItemSchema } from '../commons';

export const ItemsSchema = z.array(ItemSchema);

export const OrdersPatchSchema = z.array(
  z.object({
    id: z.string(),
    orderInInput: z.string().min(0),
  }),
);
