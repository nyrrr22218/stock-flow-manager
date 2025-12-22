'use client';

import { AnimatePage } from '@/components/sign-in/sign-in-motion';
import { TabsStyle } from '@/components/tab/main-page-tabs-style';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { LoadingMotion } from '@/components/tab/loading-motion';

export default function MainPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePage>
      <TabsStyle />
      <Box sx={{ p: 2, position: 'relative', minHeight: '200px' }}>
        {loading && <LoadingMotion />}
        <Box sx={{ opacity: loading ? 0.3 : 1 }}>{children}</Box>
      </Box>
    </AnimatePage>
  );
}
