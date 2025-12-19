'use client';

import { TItemStockAndInput } from '@/types/Tabtype/tab2';
import { handleAxiosError } from '@/utils/axiosError';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tab2() {
  const [tabTwoStockList, setTabTwoStockList] = useState<TItemStockAndInput[]>([]);
  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tab2');
        const itemAndInput: TItemStockAndInput[] = (data.items ?? []).map(
          (item: TItemStockAndInput) => ({
            ...item,
            stockInInput: item.stocktable ? String(item.stocktable.stock_count) : '0',
          }),
        );
        setTabTwoStockList(itemAndInput);
      } catch (error) {
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    fetchData();
  }, []);

  const handleEditToggle = () => {
    setEditmode(!editmode);
  };

  const handleSave = async () => {
    try {
      const { data }: { data: { success: boolean; error?: string } } = await axios.patch(
        '/api/tab2',
        {
          items: tabTwoStockList,
        },
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

  return (
    <Box>
      <Box>
        <Button variant="contained" size="small" onClick={handleEditToggle}>
          編集
        </Button>
        <Button variant="contained" size="small" disabled={!editmode} onClick={handleSave}>
          保存
        </Button>
      </Box>
      <Box>
        {tabTwoStockList.map((st) => (
          <Box key={st.id}>
            <Typography>{st.item_name}</Typography>
            <TextField
              value={st.stockInInput ?? ''}
              disabled={!editmode}
              onChange={(e) =>
                setTabTwoStockList((prev) =>
                  prev.map((i) => (i.id === st.id ? { ...i, stockInInput: e.target.value } : i)),
                )
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
