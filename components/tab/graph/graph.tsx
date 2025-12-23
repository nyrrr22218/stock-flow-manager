'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TItem } from '@/schemas/commons';
import { FormatData } from '@/utils';
import { TItemAndInput } from '@/types';
import InventoryAnalytics from './graph-style';
import { ErrorMessageStyle } from '@/components/commons';
import { handleAxiosErrorAndLog } from '@/lib/axios-error';

export default function Graph({ graphOfData }: { graphOfData: TItem[] }) {
  const formattedData = graphOfData.map((item) => ({
    ...item,
    orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
  }));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [graphdata, setGraphData] = useState<TItemAndInput[]>(FormatData(formattedData));

  useEffect(() => {
    if (graphOfData && graphOfData.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const res = await axios.get('/api/tab1', { signal });
        setGraphData(res.data.items || []);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'tab6-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [graphOfData]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        状況分析
      </Typography>
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      {graphdata.length > 0 ? (
        <InventoryAnalytics graphOfData={graphdata} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
