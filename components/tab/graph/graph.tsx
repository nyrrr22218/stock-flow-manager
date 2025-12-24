'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Item } from '@/schemas/commons';
import { formatData } from '@/utils';
import { ItemDataWithInput } from '@/types';
import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { ErrorMessage } from '@/components';
import GraphDisplay from './graph-ui';

export default function Graph({ graphData }: { graphData: Item[] }) {
  const graphDataWithInput = graphData.map((item) => ({
    ...item,
    orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
  }));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemGraphData, setItemGraphData] = useState<ItemDataWithInput[]>(
    formatData(graphDataWithInput),
  );

  useEffect(() => {
    if (graphData && graphData.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const res = await axios.get('/api/orders', { signal });
        setItemGraphData(res.data.items || []);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'graph-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [graphData]);

  return (
    <Box sx={{ p: 2 }}>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      {itemGraphData.length > 0 ? (
        <GraphDisplay graphData={itemGraphData} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
