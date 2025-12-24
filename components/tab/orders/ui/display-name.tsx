import { Box, Typography } from '@mui/material';
import { columnLayout } from '../../../commons';
import { displayName } from '../..';

export const DisplayName = () => {
  return (
    <Box
      sx={{
        ...columnLayout,
      }}
    >
      {displayName.map((li) => (
        <Typography key={li.id} variant="h5" fontWeight="bold">
          {li.value}
        </Typography>
      ))}
    </Box>
  );
};
