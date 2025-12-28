import type { Item } from '@/schemas/commons';
import { Dispatch, SetStateAction } from 'react';
import type { shippingUpdatedItems } from './shipments';

export type ItemDataWithInput = Item & { orderInInput: string };

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

export type TextFieldsProps = Pick<OrdersButtonProps, 'editMode' | 'setEditMode'> & {
  item: ItemDataWithInput;
  setOrdersPageList: (value: SetStateAction<ItemDataWithInput[]>) => void;
};

export type ShippingPost = {
  success: boolean;
  shippingUpdatedItems: shippingUpdatedItems[];
};
