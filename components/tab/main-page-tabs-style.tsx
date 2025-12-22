import { Box, Tab, Tabs } from '@mui/material';
import { tabList } from '.';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const TabsStyle = () => {
  const pathname = usePathname();
  const activeTab = tabList.find((tab) => tab.href === pathname)?.value || 'tab1';
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
        {tabList.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            component={Link}
            href={tab.href}
            sx={{
              fontSize: '20px',
              mx: 2,
              transition: '0.3s',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                color: 'blueviolet',
                borderRadius: '8px 8px 0 0',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
