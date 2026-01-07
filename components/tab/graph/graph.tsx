'use client';

import { ErrorMessage } from '@/components/commons/error-message';

import type { Item } from '@/schemas/commons';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';

const GraphDisplay = dynamic(() => import('./graph-ui'), {
  ssr: false,
  loading: () => (
    <Box sx={{ height: 600 }}>
      <Typography variant="h5">Loading Chart...</Typography>
    </Box>
  ),
});

export default function Graph({ graphData }: { graphData: Item[] }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Box sx={{ p: 2 }}>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      {graphData.length > 0 ? (
        <GraphDisplay graphData={graphData} />
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Box>
  );
}
