import { ItemSchema } from '../commons';
import { z } from 'zod';

const ProductItemSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  producttable: true,
});

export const ArrayProductItemSchema = z.array(ProductItemSchema);

export const PatchProductSchema = z.array(
  z.object({
    id: z.string(),
    productedInInput: z.string().min(0),
  }),
);
