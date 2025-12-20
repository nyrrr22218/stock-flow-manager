'use client';

import { TItemnameTable } from '@/types/Tabtype/tab4';
import { handleAxiosError } from '@/utils/axiosError';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tab4() {
  const [addNewItemName, setAddNewItemName] = useState('');
  const [error, setError] = useState('');
  const [itemnameList, setItemnameList] = useState<TItemnameTable[]>([]);

  const handleItemAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/tab4', { item_name: addNewItemName });
      if (data.success) {
        setItemnameList((prev) => [
          ...prev,
          {
            id: data.newItem.id,
            item_name: data.newItem.item_name,
          },
        ]);
        console.log('送信成功');
      } else {
        console.log('失敗');
      }
      setAddNewItemName('');
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tab4');
        setItemnameList(data.items);
      } catch (error) {
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    fetchData();
  }, []);

  const deleteItemnameTable = async (id: string) => {
    try {
      const { data } = await axios.delete('/api/tab4', { data: { id } });
      if (!data.success) {
        setError(data.error);
        return;
      }
      setItemnameList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknownError');
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleItemAdd}>
        <fieldset>
          <legend>Add</legend>
          <Box>
            <TextField
              placeholder="なまえ"
              value={addNewItemName}
              onChange={(e) => setAddNewItemName(e.target.value)}
            ></TextField>
            {error && <Typography>{error}</Typography>}
            <Button type="submit">Add</Button>
          </Box>
        </fieldset>
      </form>
      <Box>
        {itemnameList.map((item) => (
          <Box key={item.id}>
            <Typography>{item.item_name}</Typography>
            <Button onClick={() => deleteItemnameTable(item.id)}>削除</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
