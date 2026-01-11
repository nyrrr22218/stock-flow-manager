'use client';

import { signInButton } from '@/styles/variants-style';
import { Button, CircularProgress } from '@mui/material';

export const SignInButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={loading}
      sx={{
        ...signInButton(loading),
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'サインイン'}
    </Button>
  );
};
