import { z } from 'zod';
import { ItemSchema } from '../commons';

export const ArrayItemSchema = z.array(ItemSchema);

export const PatchOrderSchema = z.array(
  z.object({
    id: z.string(),
    orderInInput: z.string().min(0),
  }),
);
