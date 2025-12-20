import { LogTableSchema } from '@/schemas/commons';
import { z } from 'zod';

export type TLogTable = z.infer<typeof LogTableSchema>;
