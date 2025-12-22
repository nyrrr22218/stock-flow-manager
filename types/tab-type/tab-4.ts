import { ItemnameTableSchema } from '@/schemas/api/tab-4';
import { z } from 'zod';

export type TItemnameTable = z.infer<typeof ItemnameTableSchema>;
