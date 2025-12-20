import { TItem } from '@/schemas/commons';

export type TItemAndInput = TItem & { orderInInput: string };

export type TOrderSend = {
  id: string;
  orderInInput: string;
};
