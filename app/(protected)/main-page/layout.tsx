'use client';

import { TabContents } from '@/components/commons/tab-contents';
import { loadingMotion } from '@/styles/commons';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

const SignInMotion = dynamic(() =>
  import('@/components/sign-in/sign-in-motion').then((mod) => mod.SignInMotion),
);

export default function MainPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SignInMotion>
      <TabContents />
      <Box sx={{ p: 2, position: 'relative', minHeight: '200px' }}>
        {loading && (
          <Box
            sx={{
              ...loadingMotion,
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
        <Box sx={{ opacity: loading ? 0.3 : 1 }}>{children}</Box>
      </Box>
    </SignInMotion>
  );
}
