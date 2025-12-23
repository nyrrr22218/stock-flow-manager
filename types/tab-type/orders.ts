import { TItem } from '@/schemas/commons';
import { Dispatch, SetStateAction } from 'react';

export type TItemAndInput = TItem & { orderInInput: string };

export type TOrderSend = {
  id: string;
  orderInInput: string;
};

export type CalculateFunctionProps = {
  item: TItemAndInput;
};

export type DialogStyleProps = {
  open: boolean;
  loading: boolean;
  closeDialog: () => void;
  handleShippingCompleted: () => Promise<void>;
};

export type Tab1ButtonCommonProps = Pick<
  DialogStyleProps,
  'open' | 'loading' | 'handleShippingCompleted'
> & {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ItemProps = {
  editMode: boolean;
  item: TItemAndInput;
  setTabOneItemList: (value: SetStateAction<TItemAndInput[]>) => void;
};
