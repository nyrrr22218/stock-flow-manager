import Header from '@/components/header';
import Footer from '@/components/footer';
import { Box } from '@mui/material';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
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
