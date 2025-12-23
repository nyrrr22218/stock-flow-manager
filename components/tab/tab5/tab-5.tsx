'use client';

import { Tab5LogSort } from './tab-5-sort';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { ErrorMessageStyle, handleAxiosError } from '@/utils';
import { TLogTable } from '@/schemas';

export default function Tab5({ Tab5Data }: { Tab5Data: TLogTable[] }) {
  const [log, setLog] = useState<TLogTable[]>(() => {
    if (Tab5Data) return Tab5Data;
    return [];
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(() => 'desc');

  useEffect(() => {
    if (Tab5Data && Tab5Data.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get('/api/tab5', { signal });
        setLog(data.logsData || []);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [Tab5Data]);

  const sortLogs = useMemo(() => {
    return Array.from(log).sort((a, b) => {
      const dateA = new Date(a.logged_at).getTime();
      const dateB = new Date(b.logged_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [log, sortOrder]);

  return (
    <Box>
      <Typography variant="h4">各種変更・出荷履歴</Typography>
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <Tab5LogSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}>
        {sortLogs.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {sortLogs.map((l) => (
          <Box
            key={l.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
              p: 1,
            }}
          >
            <Typography>{l.log_message}</Typography>
            <Typography>
              {new Date(l.logged_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
