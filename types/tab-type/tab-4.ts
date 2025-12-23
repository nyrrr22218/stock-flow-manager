import { ItemnameTableSchema } from '@/schemas/api/tab-4';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { z } from 'zod';

export type TItemnameTable = z.infer<typeof ItemnameTableSchema>;

export type Tab4PaperProps = {
  loading: boolean;
  handleItemAdd: (e: FormEvent<Element>) => Promise<void>;
  addNewItemName: string;
  setAddNewItemName: Dispatch<SetStateAction<string>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};
