'use client';

import { TItemProductAndInput } from '@/types/Tabtype/tab3';
import { handleAxiosError } from '@/utils/axiosError';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tab3() {
  const [product, setProduct] = useState<TItemProductAndInput[]>([]);
  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tab3');
        const itemAndInput: TItemProductAndInput[] = (data.items ?? []).map(
          (item: TItemProductAndInput) => ({
            ...item,
            productedInInput: item.producttable ? String(item.producttable.producted_count) : '0',
          }),
        );
        setProduct(itemAndInput);
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
      const { data }: { data: { success: boolean; error?: string } } = await axios.post(
        '/api/tab3',
        { items: product },
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
        {product.map((pr) => (
          <Box key={pr.id}>
            <Typography>{pr.item_name}</Typography>
            <TextField
              value={pr.productedInInput}
              disabled={!editmode}
              onChange={(e) =>
                setProduct((prev) =>
                  prev.map((i) =>
                    i.id === pr.id ? { ...i, productedInInput: e.target.value } : i,
                  ),
                )
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
