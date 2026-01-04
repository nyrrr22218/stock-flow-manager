'use client';

import { logout } from '@/app/actions/sign-in-actions';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <>
      <AppBar sx={{ height: '60px', bgcolor: 'gray', position: 'fixed' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">Stock Flow Manager</Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography sx={{ mt: 1 }}>
              {userEmail ? `ようこそ ${userEmail} さん` : 'ログインしていません'}
            </Typography>
            <Button
              sx={{ color: 'white' }}
              onClick={async () => {
                const result = await logout();
                if (result?.error) {
                  alert(result.error);
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ minHeight: '60px' }} />
    </>
  );
}
