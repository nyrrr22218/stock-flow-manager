'use client';

import { displayName } from '../../contents/objects';
import { columnLayout } from '@/styles/orders-grid-layout';

import { Box, Typography } from '@mui/material';

export const DisplayName = () => {
  return (
    <Box
      sx={{
        ...columnLayout,
      }}
    >
      {displayName.map((li, index) => (
        <Typography
          key={index}
          variant="h5"
          sx={{ fontSize: { xs: '0.8rem', md: '1.2rem' }, fontWeight: 'bold' }}
        >
          {li}
        </Typography>
      ))}
    </Box>
  );
};
