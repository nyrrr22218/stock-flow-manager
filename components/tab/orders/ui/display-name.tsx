import { Box, Typography } from '@mui/material';
import { displayName } from '../../objects';
import { columnLayout } from '@/styles/orders-grid-layout';

export const DisplayName = () => {
  return (
    <Box
      sx={{
        ...columnLayout,
      }}
    >
      {displayName.map((li, index) => (
        <Typography key={index} variant="h5" fontWeight="bold">
          {li}
        </Typography>
      ))}
    </Box>
  );
};
