import { Box, Typography } from '@mui/material';
import { useTab1 } from '@/hooks/useTab1';
import { Tab1ButtonCommon } from './Tab1Button';
import { numberColumnLayout } from './Tab1GridLayout';
import { Tab1TypeOfDisplayName } from './Tab1TypeOfDisplayName';
import { CalculateFunction } from './CalculateFunction';
import { useHandleEditToggle } from '@/hooks/useHandleEditToggle';
import { Tab1TextField } from './Tab1TextField';

export default function Tab1() {
  const {
    tabOneItemList,
    setTabOneItemList,
    editMode,
    loading,
    handleSave,
    handleShippingCompleted,
  } = useTab1();
  const { handleEditToggle } = useHandleEditToggle();

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
