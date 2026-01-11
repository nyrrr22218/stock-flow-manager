'use client';

import { tabList } from '../tab/contents/objects';
import { tabContentsCommon } from '@/styles/variants-style';

import Link from 'next/link';
import { Tab, Tabs } from '@mui/material';
import { usePathname } from 'next/navigation';

export const TabContents = () => {
  const pathname = usePathname();

  return (
    <Tabs value={false} variant="scrollable" scrollButtons="auto">
      {tabList.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Tab
            key={tab.href}
            label={tab.label}
            component={Link}
            href={tab.href}
            sx={{
              ...tabContentsCommon(isActive),
            }}
          />
        );
      })}
    </Tabs>
  );
};
