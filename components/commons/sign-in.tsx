'use client';

import { SignInButton, VisibilityIconButton } from '@/components/sign-in';
import { useSignIn } from '@/hooks/use-sign-in';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
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
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <VisibilityIconButton
                  reverseVisibility={reverseVisibility}
                  showPassword={showPassword}
                />
              ),
            }}
          />
          {error && <Typography>{error}</Typography>}
          <SignInButton loading={loading} />
        </Box>
      </Paper>
    </Container>
  );
}
