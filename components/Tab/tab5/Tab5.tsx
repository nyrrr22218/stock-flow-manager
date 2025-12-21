import { TLogTable } from '@/types/Tabtype/tab5';
import { handleAxiosError } from '@/utils/axiosError';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Tab5() {
  const [log, setLog] = useState<TLogTable[]>([]);

  useEffect(() => {
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get('/api/tab5', { signal });
        setLog(data.logsData);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <Box>
      <Typography>ログを出します</Typography>
      {log.length === 0 && <Typography variant="h5">Loading...</Typography>}
      {log.map((l) => (
        <Typography key={l.id}>{l.logs}</Typography>
      ))}
    </Box>
  );
}
