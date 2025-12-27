import { ItemName } from '@/schemas';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export type AddItemFormProps = {
  loading: boolean;
  handleItemAdd: (e: FormEvent<Element>) => Promise<void>;
  newItemName: string;
  setNewItemName: Dispatch<SetStateAction<string>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

export type ItemDeleteDialogProps = {
  open: boolean;
  loading: boolean;
  closeDialog: () => void;
  deleteItem: (id: string, itemName: string) => Promise<void>;
  selectedItem: ItemName | null;
};

export type ItemList = {
  itemNameList: ItemName[];
  openDialog: (item: ItemName) => void;
};
