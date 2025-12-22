import { Box, CircularProgress } from '@mui/material';

export const LoadingMotion = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};
