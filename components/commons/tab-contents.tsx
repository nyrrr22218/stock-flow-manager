import { Tab, Tabs } from '@mui/material';
import { tabList } from '../tab/objects';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
              fontSize: '20px',
              mx: 2,
              transition: '0.3s',
              color: isActive ? 'blueviolet' : 'inherit',
              fontWeight: isActive ? 'bold' : 'normal',
              borderBottom: isActive ? '3px solid blueviolet' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                color: 'blueviolet',
              },
            }}
          />
        );
      })}
    </Tabs>
  );
};
