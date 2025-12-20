import { z } from 'zod';
import { LogTableSchema } from '../commons';

export const ArrayLogTableSchema = z.array(LogTableSchema);
