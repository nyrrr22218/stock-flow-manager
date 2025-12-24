'use client';

import { TabContents, LoadingMotion } from '@/components';
import { SignInMotion } from '@/components/sign-in';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

export default function MainPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SignInMotion>
      <TabContents />
      <Box sx={{ p: 2, position: 'relative', minHeight: '200px' }}>
        {loading && <LoadingMotion />}
        <Box sx={{ opacity: loading ? 0.3 : 1 }}>{children}</Box>
      </Box>
    </SignInMotion>
  );
}
