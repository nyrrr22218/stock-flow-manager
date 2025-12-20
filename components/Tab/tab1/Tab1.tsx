import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TItemAndInput } from '@/types/Tabtype/tab1';
import { handleAxiosError } from '@/utils/axiosError';

export default function Tab1() {
  const [tabOneItemList, setTabOneItemList] = useState<TItemAndInput[]>([]);
  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tab1');
        const itemAndInput: TItemAndInput[] = (data.items ?? []).map((item: TItemAndInput) => ({
          ...item,
          orderInInput: item.ordertable ? String(item.ordertable.order_count) : '0',
        }));
        setTabOneItemList(itemAndInput);
      } catch (error) {
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    fetchData();
  }, []);

  const handleEditToggle = () => setEditmode(!editmode);

  const handleSave = async () => {
    try {
      const { data }: { data: { success: boolean; error?: string } } = await axios.patch(
        'api/tab1',
        { items: tabOneItemList },
      );
      if (data.success) {
        setEditmode(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
    }
  };

  const missingOrder = (item: TItemAndInput): number => {
    const order = Number(item.ordertable?.order_count ?? 0);
    const stock = Number(item.stocktable?.stock_count ?? 0);
    return order - stock;
  };

  const finalmissingOrder = (item: TItemAndInput) => {
    const product = Number(item.producttable?.producted_count ?? 0);
    return missingOrder(item) - product;
  };

  const handleShippingCompleted = async () => {
    try {
      const { data } = await axios.post('/api/shipments', {
        items: tabOneItemList,
      });
      if (data.success) {
        setTabOneItemList((prev) =>
          prev.map((order) => ({
            ...order,
            orderInInput: '0',
            ordertable: order.ordertable
              ? { ...order.ordertable, order_count: 0 }
              : order.ordertable,
          })),
        );
        setEditmode(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '800px',
        }}
      >
        <Typography>商品一覧</Typography>
      </Box>
      <Box>
        <Button variant="contained" size="small" onClick={handleEditToggle}>
          編集
        </Button>
        <Button variant="contained" size="small" disabled={!editmode} onClick={handleSave}>
          保存
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={editmode}
          onClick={handleShippingCompleted}
        >
          出荷
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '850px',
        }}
      >
        <Typography>商品名</Typography>
        <Typography>注文数</Typography>
        <Typography>在庫数</Typography>
        <Typography>不足数</Typography>
        <Typography>生産数</Typography>
        <Typography>最終不足数</Typography>
      </Box>
      {tabOneItemList.length === 0 && <Typography>商品はまだありません</Typography>}
      {tabOneItemList.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '800px',
          }}
        >
          <Typography>{item.item_name}</Typography>
          <TextField
            value={item.orderInInput}
            disabled={!editmode}
            onChange={(e) => {
              const inputValueAsString = e.target.value;
              const numericInputValueAsString = Number(inputValueAsString) || 0;
              setTabOneItemList((prev) =>
                prev.map((i) =>
                  i.id === item.id
                    ? {
                        ...i,
                        orderInInput: inputValueAsString,
                        ordertable: i.ordertable
                          ? { ...i.ordertable, order_count: numericInputValueAsString }
                          : { id: '', itemname_id: i.id, order_count: numericInputValueAsString },
                      }
                    : i,
                ),
              );
            }}
          />
          <Typography>{item.stocktable?.stock_count ?? 0}</Typography>
          <Typography>{missingOrder(item)}</Typography>
          <Typography>{item.producttable?.producted_count ?? 0}</Typography>
          <Typography>{finalmissingOrder(item)}</Typography>
        </Box>
      ))}
    </Box>
  );
}
