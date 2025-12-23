import { Dispatch, FormEvent, SetStateAction } from 'react';

export type Tab4PaperProps = {
  loading: boolean;
  handleItemAdd: (e: FormEvent<Element>) => Promise<void>;
  addNewItemName: string;
  setAddNewItemName: Dispatch<SetStateAction<string>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};
