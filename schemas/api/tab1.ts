import { z } from 'zod';
import { ItemSchema } from '../commons';

export const ArrayItemSchema = z.array(ItemSchema);

export const OrderSendSchema = z.array(
  z.object({
    itemname_id: z.number(),
    order_count: z.number().min(0),
  }),
);
