'use client';

import { supabase } from '@/lib/supabase-client';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('ログアウトエラー' + error.message);
      console.error('ログアウトエラー', error.message);
      return;
    }
    router.push('/sign-in');
    router.refresh();
  };

  return (
    <>
      <AppBar sx={{ height: '60px', bgcolor: 'gray' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">Stock Flow Manager</Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography sx={{ mt: 1 }}>ようこそ {userEmail} さん</Typography>
            <Button sx={{ color: 'white' }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ minHeight: '60px' }} />
    </>
  );
}
