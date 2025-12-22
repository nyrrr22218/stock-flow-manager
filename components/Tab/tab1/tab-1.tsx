'use client';

import { CalculateFunction } from '@/components/tab/tab1/calculate-function';
import { Tab1ButtonCommon } from '@/components/tab/tab1/tab-1-button';
import { numberColumnLayout } from '@/components/tab/tab1/tab-1-grid-layout';
import { Tab1TextField } from '@/components/tab/tab1/tab-1-text-field';
import { Tab1TypeOfDisplayName } from '@/components/tab/tab1/tab-1-type-of-display-name';
import { useTab1 } from '@/hooks/use-tab-1';
import { Box, Typography } from '@mui/material';

export default function Tab1() {
  const {
    tabOneItemList,
    setTabOneItemList,
    editMode,
    loading,
    handleSave,
    handleEditToggle,
    handleShippingCompleted,
  } = useTab1();

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Tab1ButtonCommon
        handleEditToggle={handleEditToggle}
        editmode={editMode}
        loading={loading}
        handleSave={handleSave}
        handleShippingCompleted={handleShippingCompleted}
      />
      <Tab1TypeOfDisplayName />
      {tabOneItemList.length === 0 && <Typography variant="h5">Loading...</Typography>}
      {tabOneItemList.map((item) => (
        <Box key={item.id} sx={{ ...numberColumnLayout }}>
          <Typography sx={{ ml: 3 }}>{item.item_name}</Typography>
          <Tab1TextField item={item} editMode={editMode} setTabOneItemList={setTabOneItemList} />
          <CalculateFunction item={item} />
        </Box>
      ))}
    </Box>
  );
}
