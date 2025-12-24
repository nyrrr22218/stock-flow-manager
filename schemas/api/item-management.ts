import { z } from 'zod';

export const ItemNameSchema = z.object({
  id: z.string(),
  item_name: z.string(),
});

export const ItemNameAddSchema = ItemNameSchema.pick({
  item_name: true,
});

export const ItemNamesSchema = z.array(ItemNameSchema);

export type ItemName = z.infer<typeof ItemNameSchema>;
