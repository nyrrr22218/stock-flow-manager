'use client';

import { TabContents } from '@/components/commons/tab-contents';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

const SignInMotion = dynamic(() =>
  import('@/components/sign-in/sign-in-motion').then((mod) => mod.SignInMotion),
);
const LoadingMotion = dynamic(() =>
  import('@/components/commons/loading-motion').then((mod) => mod.LoadingMotion),
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
        {loading && <LoadingMotion />}
        <Box sx={{ opacity: loading ? 0.3 : 1 }}>{children}</Box>
      </Box>
    </SignInMotion>
  );
}
