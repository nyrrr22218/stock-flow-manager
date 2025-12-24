import { z } from 'zod';
import { LogSchema } from '../commons';

export const LogsSchema = z.array(LogSchema);

export type Log = z.infer<typeof LogSchema>;
