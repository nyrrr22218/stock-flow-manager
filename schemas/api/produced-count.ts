import { ItemSchema } from '../commons';

import { z } from 'zod';

const ProducedCountSchema = ItemSchema.pick({
  id: true,
  name: true,
  producedCount: true,
});

export const ProducedCountsSchema = z.array(ProducedCountSchema);

export const ProducedCountsPatchSchema = z.array(
  z.object({
    id: z.string(),
    producedInInput: z.string().min(0),
  }),
);
