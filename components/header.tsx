'use client';

import { logout } from '@/app/actions/sign-in-actions';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <>
      <AppBar sx={{ minHeight: '60px', bgcolor: 'gray', position: 'fixed' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '3rem' } }}>
            Stock Flow Manager
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-end', sm: 'center' },
              gap: { xs: 0, sm: 4 },
            }}
          >
            <Typography sx={{ mt: 1 }}>
              {userEmail ? `ようこそ ${userEmail} さん` : 'ログインしていません'}
            </Typography>
            <Button
              sx={{ color: 'white', p: { xs: 0, sm: 1 } }}
              onClick={async () => {
                const result = await logout();
                if (result?.error) {
                  alert(result.error);
                }
              }}
            >
              Signout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: { xs: '80px', sm: '64px' },
          visibility: 'hidden',
        }}
      />
    </>
  );
}
