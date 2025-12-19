import { ItemSchema } from '../commons';
import { z } from 'zod';

const ProductItemSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  producttable: true,
});

export const ArrayProductItemSchema = z.array(ProductItemSchema);

export const ProductSendSchema = z.array(
  z.object({
    itemname_id: z.number(),
    producted_count: z.number().min(0),
  }),
);
