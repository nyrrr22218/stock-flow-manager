'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Item } from '@/schemas/commons';
import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { ErrorMessage } from '@/components/commons/error-message';
import dynamic from 'next/dynamic';

const GraphDisplay = dynamic(() => import('./graph-ui'), {
  ssr: false,
  loading: () => <Typography variant="h5">Loading Chart...</Typography>,
});

export default function Graph({ graphData }: { graphData: Item[] }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemGraphData, setItemGraphData] = useState(graphData);

  useEffect(() => {
    if (graphData && graphData.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const res = await axios.get<{ success: boolean; items: Item[] }>('/api/orders', { signal });
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
        <GraphDisplay itemGraphData={itemGraphData} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
