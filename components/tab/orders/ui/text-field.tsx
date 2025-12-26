import { TextFieldsProps, ItemDataWithInput } from '@/types';
import { TextField } from '@mui/material';

export const TextFields = ({ item, editMode, setOrdersPageList }: TextFieldsProps) => {
  return (
    <TextField
      type="number"
      size="small"
      value={item.orderInInput}
      disabled={!editMode}
      onBlur={() => {
        if (item.orderInInput === '') {
          setOrdersPageList((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, orderInInput: '0' } : i)),
          );
        }
      }}
      onChange={(e) => {
        const inputValue = e.target.value;
        if (inputValue !== '' && !/^[0-9]+$/.test(inputValue)) return;
        const numInputValue = Number(inputValue) || 0;
        setOrdersPageList((prev: ItemDataWithInput[]) =>
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
