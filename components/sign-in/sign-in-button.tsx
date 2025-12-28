import { Button, CircularProgress } from '@mui/material';

export const SignInButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={loading}
      sx={{
        transition: 'all 0.3s',
        transform: loading ? 'scale(0.95)' : 'scale(1)',
        opacity: loading ? 0.7 : 1,
        bgcolor: 'blueviolet',
        color: 'white',
        '&:hover': { bgcolor: 'darkorchid' },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'サインイン'}
    </Button>
  );
};
