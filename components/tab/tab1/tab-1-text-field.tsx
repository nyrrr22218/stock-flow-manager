import { ItemProps, TItemAndInput } from '@/types/tab-type/tab-1';
import { TextField } from '@mui/material';

export const Tab1TextField = ({ item, editMode, setTabOneItemList }: ItemProps) => {
  return (
    <TextField
      type="number"
      size="small"
      value={item.orderInInput}
      disabled={!editMode}
      onChange={(e) => {
        const inputValue = e.target.value;
        if (inputValue !== '' && !/^[0-9]+$/.test(inputValue)) return;
        const numInputValue = Number(inputValue) || 0;
        setTabOneItemList((prev: TItemAndInput[]) =>
          prev.map((i) => {
            if (i.id !== item.id) return i;
            return {
              ...i,
              orderInInput: inputValue,
              ordertable: i.order
                ? {
                    ...i.order,
                    order_count: numInputValue,
                  }
                : {
                    id: '',
                    itemname_id: i.id,
                    order_count: numInputValue,
                  },
            };
          }),
        );
      }}
    />
  );
};
