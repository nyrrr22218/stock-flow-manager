import { ItemSchema } from '../commons';
import { z } from 'zod';

const ProductSchema = ItemSchema.pick({
  id: true,
  item_name: true,
  product: true,
});

export const ProductsSchema = z.array(ProductSchema);

export const ProductsPatchSchema = z.array(
  z.object({
    id: z.string(),
    productedInInput: z.string().min(0),
  }),
);
