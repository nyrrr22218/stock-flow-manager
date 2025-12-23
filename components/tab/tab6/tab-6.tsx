'use client';

import { TItemAndInput } from '@/types/tab-type/tab-1';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InventoryAnalytics from '@/components/tab/tab6/tab-6-graph';
import { TItem } from '@/schemas/commons';
import { FormatData } from '@/utils/formatdata';
import { ErrorMessageStyle, handleAxiosError } from '@/utils';

export default function Tab6({ tab1Data }: { tab1Data: TItem[] }) {
  const formattedData = tab1Data.map((item) => ({
    ...item,
    orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
  }));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [graphdata, setGraphData] = useState<TItemAndInput[]>(FormatData(formattedData));

  useEffect(() => {
    if (tab1Data && tab1Data.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const res = await axios.get('/api/tab1', { signal });
        setGraphData(res.data.items || []);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        setErrorMessage(err.message);
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
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      {graphdata.length > 0 ? (
        <InventoryAnalytics data={graphdata} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
