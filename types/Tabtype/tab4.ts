import { ItemnameTableSchema } from '@/schemas/api/tab4';
import { z } from 'zod';

export type TItemnameTable = z.infer<typeof ItemnameTableSchema>;
