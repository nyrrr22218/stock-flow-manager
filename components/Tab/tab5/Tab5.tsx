import { TLogTable } from '@/types/Tabtype/tab5';
import { handleAxiosError } from '@/utils/axiosError';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tab5() {
  const [log, setLog] = useState<TLogTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/tab5');
        setLog(data.logsData);
      } catch (error) {
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography>ログを出します</Typography>
      {log.map((l) => (
        <Typography key={l.id}>{l.logs}</Typography>
      ))}
    </Box>
  );
}
