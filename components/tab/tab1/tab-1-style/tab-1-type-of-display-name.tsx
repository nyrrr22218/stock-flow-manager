import { Box, Typography } from '@mui/material';
import { columnLayout } from '..';
import { tab1DisplayName } from '../..';

export const Tab1TypeOfDisplayName = () => {
  return (
    <Box
      sx={{
        ...columnLayout,
      }}
    >
      {tab1DisplayName.map((li) => (
        <Typography key={li.id} variant="h5" fontWeight="bold">
          {li.value}
        </Typography>
      ))}
    </Box>
  );
};
