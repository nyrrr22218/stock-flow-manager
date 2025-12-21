import { Box, Tab, Tabs } from '@mui/material';
import { tabList } from './Tab';
import { SyntheticEvent } from 'react';

interface TabsStyleProps {
  activetab: string;
  handleLoadingEvent: (e: SyntheticEvent<Element, Event>, newValue: string) => void;
}

export const TabsStyle = ({ activetab, handleLoadingEvent }: TabsStyleProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={activetab}
        onChange={handleLoadingEvent}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabList.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
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
