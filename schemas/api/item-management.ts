import { z } from 'zod';

const ItemNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ItemNameAddSchema = ItemNameSchema.pick({
  name: true,
});

export const ItemNamesSchema = z.array(ItemNameSchema);

export type ItemName = z.infer<typeof ItemNameSchema>;
