import { Item } from '@/schemas/commons';
import { Dispatch, SetStateAction } from 'react';

export type ItemDataWithInput = Item & { orderInInput: string; shotage?: number };

export type CalculateProps = {
  item: ItemDataWithInput;
};

export type DialogsProps = {
  open: boolean;
  loading: boolean;
  closeDialog: () => void;
  handleShippingCompleted: () => Promise<void>;
};

export type OrdersButtonProps = Pick<
  DialogsProps,
  'open' | 'loading' | 'handleShippingCompleted'
> & {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type TextFieldsProps = {
  editMode: boolean;
  item: ItemDataWithInput;
  setOrdersPageList: (value: SetStateAction<ItemDataWithInput[]>) => void;
};
