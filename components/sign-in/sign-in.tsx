'use client';

import dynamic from 'next/dynamic';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { signIn } from '@/app/actions/sign-in-actions';

const SignInButton = dynamic(
  () => import('@/components/sign-in/sign-in-button').then((mod) => mod.SignInButton),
  {
    ssr: false,
  },
);

const VisibilityIconButton = dynamic(
  () =>
    import('@/components/sign-in/visibility-icon-button').then((mod) => mod.VisibilityIconButton),
  { ssr: false },
);

export default function SignIn() {
  const [mount, setMount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const reverseVisibility = () => setShowPassword(!showPassword);

  if (!mount) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const result = await signIn({
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      }
    } catch (err: unknown) {
      console.error('[Login_Fatal]', err);
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

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
