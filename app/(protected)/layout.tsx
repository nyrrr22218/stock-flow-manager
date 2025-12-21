import createsupabaseServerClient from '@/lib/supabaseServer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box } from '@mui/material';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  await createsupabaseServerClient();
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
