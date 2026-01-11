import Header from '@/components/header';
import Footer from '@/components/footer';
import { createClient } from '@/lib/supabase-server';

import { Box } from '@mui/material';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/sign-in');
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect('/sign-in');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userEmail={user.email ?? ''} />
      <Box component="main" sx={{ flexGrow: 1, minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
