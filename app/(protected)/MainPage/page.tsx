'use client';

import { AnimatePage } from '@/components/AnimatePage';
import { TabsStyle } from '@/components/MainPageTabsStyle';
import { tabList } from '@/components/Tab';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function MainPage() {
  const [activetab, setActivetab] = useState('tab1');
  const [loading, setLoading] = useState(false);

  const handleLoadingEvent = (e: React.SyntheticEvent, newValue: string) => {
    if (newValue === activetab) return;
    setLoading(true);
    setActivetab(newValue);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <AnimatePage>
        <TabsStyle activetab={activetab} handleLoadingEvent={handleLoadingEvent} />
        <Box sx={{ p: 2, position: 'relative', minHeight: '200px' }}>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 1,
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          )}
          {!loading &&
            tabList.map((tab) => activetab === tab.value && <tab.component key={tab.value} />)}
        </Box>
      </AnimatePage>
    </>
  );
}
