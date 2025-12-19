import { z } from 'zod';

export const ItemnameTableSchema = z.object({
  id: z.number(),
  itemname: z.string(),
});

export const AddItemSchema = ItemnameTableSchema.pick({
  itemname: true,
});

export const ArrayItemnameTableSchema = z.array(ItemnameTableSchema);
