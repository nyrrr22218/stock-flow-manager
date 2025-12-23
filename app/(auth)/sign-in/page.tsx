'use client';

import { ButtonToSignIn, VisibilityIconButton } from '@/components/sign-in';
import { useSignIn } from '@/hooks/use-sign-in';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showpassword,
    error,
    loading,
    handleLogin,
    reverseVisibility,
  } = useSignIn();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <Container maxWidth="xs" sx={{ mt: 15 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          ログイン
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="password"
            type={showpassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <VisibilityIconButton
                  reverseVisibility={reverseVisibility}
                  showpassword={showpassword}
                />
              ),
            }}
          />
          {error && <Typography>{error}</Typography>}
          <ButtonToSignIn loading={loading} />
        </Box>
      </Paper>
    </Container>
  );
}
