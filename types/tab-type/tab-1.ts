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

export type Tab1ButtonCommonProps = {
  open: boolean;
  loading: boolean;
  editMode: boolean;
  handleSave: () => void;
  handleEditToggle: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleShippingCompleted: () => Promise<void>;
};

export type ItemProps = {
  editMode: boolean;
  item: TItemAndInput;
  setTabOneItemList: (value: SetStateAction<TItemAndInput[]>) => void;
};
