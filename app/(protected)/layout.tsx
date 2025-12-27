import createSupabaseServerClient from '@/lib/supabase-server';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Box } from '@mui/material';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await createSupabaseServerClient();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
