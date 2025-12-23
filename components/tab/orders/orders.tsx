'use client';

import { useOrders } from '@/hooks/use-orders';
import { Box, Typography } from '@mui/material';
import {
  CalculateFunction,
  numberColumnLayout,
  Tab1ButtonCommon,
  Tab1TextField,
  Tab1TypeOfDisplayName,
} from '.';
import { TItem } from '@/schemas';

export default function Orders({ ordersData }: { ordersData: TItem[] }) {
  const formattedData = ordersData.map((item) => ({
    ...item,
    orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
  }));
  const {
    errorMessage,
    setErrorMessage,
    tabOneItemList,
    setTabOneItemList,
    editMode,
    setEditMode,
    loading,
    handleSave,
    open,
    setOpen,
    handleShippingCompleted,
  } = useOrders(formattedData);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Tab1ButtonCommon
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setEditMode={setEditMode}
        editMode={editMode}
        loading={loading}
        open={open}
        setOpen={setOpen}
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
