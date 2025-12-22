'use client';

import { TItemAndInput } from '@/types/tab-type/tab-1';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { handleAxiosError } from '@/utils/axiosError';
import InventoryAnalytics from '@/components/tab/tab6/tab-6-graph';

export default function Tab6({ tab1Data }: { tab1Data: TItemAndInput[] }) {
  const [graphdata, setGraphData] = useState<TItemAndInput[]>(() => {
    if (tab1Data) return tab1Data;
    return [];
  });

  useEffect(() => {
    if (tab1Data && tab1Data.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const res = await axios.get('/api/tab1', { signal });
        setGraphData(res.data.items || []);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [tab1Data]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        状況分析
      </Typography>
      {graphdata.length > 0 ? (
        <InventoryAnalytics data={graphdata} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
