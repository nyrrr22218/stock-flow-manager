'use client';

import Tab1 from '@/components/Tab/tab1/Tab1';
import Tab2 from '@/components/Tab/tab2/Tab2';
import Tab3 from '@/components/Tab/tab3/Tab3';
import Tab4 from '@/components/Tab/tab4/Tab4';
import Tab5 from '@/components/Tab/tab5/Tab5';
import Tab6 from '@/components/Tab/tab6/Tab6';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export default function MainPage() {
  const [activetab, setActivetab] = useState('tab1');
  return (
    <>
      <Tabs value={activetab} onChange={(e, newValue) => setActivetab(newValue)}>
        <Tab label="Tab1" value="tab1" />
        <Tab label="Tab2" value="tab2" />
        <Tab label="Tab3" value="tab3" />
        <Tab label="Tab4" value="tab4" />
        <Tab label="Tab5" value="tab5" />
        <Tab label="Tab6" value="tab6" />
      </Tabs>
      <Box>{activetab === 'tab1' && <Tab1 />}</Box>
      <Box>{activetab === 'tab2' && <Tab2 />}</Box>
      <Box>{activetab === 'tab3' && <Tab3 />}</Box>
      <Box>{activetab === 'tab4' && <Tab4 />}</Box>
      <Box>{activetab === 'tab5' && <Tab5 />}</Box>
      <Box>{activetab === 'tab6' && <Tab6 />}</Box>
    </>
  );
}
