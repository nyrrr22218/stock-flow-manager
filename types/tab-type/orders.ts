import type { Item } from '@/schemas/commons';

import { Dispatch, SetStateAction } from 'react';

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
  handleSave: () => void;
  handleCancel: () => void;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type TextFieldsProps = {
  item: ItemDataWithInput;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setOrdersPageList: (value: SetStateAction<ItemDataWithInput[]>) => void;
};

export type ShippingUpdatedItems = {
  id: string;
  stock: { stock_count: number };
  order?: { order_count: number };
  product?: { produced_count: number };
};

export type ShippingResult =
  | { success: true; shippingUpdatedItems: ShippingUpdatedItems[]; error?: never }
  | { success: false; error: string; shippingUpdatedItems?: never };
