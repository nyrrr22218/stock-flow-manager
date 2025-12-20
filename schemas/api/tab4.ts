import { z } from 'zod';

export const ItemnameTableSchema = z.object({
  id: z.string(),
  item_name: z.string(),
});

export const AddItemSchema = ItemnameTableSchema.pick({
  item_name: true,
});

export const ArrayItemnameTableSchema = z.array(ItemnameTableSchema);
