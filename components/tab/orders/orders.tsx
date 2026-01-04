'use client';

import { useOrders } from '@/hooks/use-orders';
import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';

import { Calculate } from './ui/calculate';
import { OrdersButton } from './ui/button';
import { TextFields } from './ui/text-field';
import { DisplayName } from './ui/display-name';
import { numberColumnLayout } from '@/styles/orders-grid-layout';

import type { ItemDataWithInput } from '@/types';

import { Box, Typography } from '@mui/material';

export default function Orders({
  orderDataWithInput,
}: {
  orderDataWithInput: ItemDataWithInput[];
}) {
  const {
    errorMessage,
    setErrorMessage,
    ordersPageList,
    setOrdersPageList,
    editMode,
    setEditMode,
    loading,
    handleSave,
    open,
    setOpen,
    handleShippingCompleted,
  } = useOrders(orderDataWithInput);

  useHandleBeforeUnload(editMode);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <OrdersButton
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
      <DisplayName />
      {ordersPageList.length === 0 && <Typography variant="h5">Loading...</Typography>}
      {ordersPageList.map((item) => (
        <Box key={item.id} sx={{ ...numberColumnLayout }}>
          <Typography sx={{ ml: 3 }}>{item.item_name}</Typography>
          <TextFields
            item={item}
            editMode={editMode}
            setEditMode={setEditMode}
            setOrdersPageList={setOrdersPageList}
          />
          <Calculate item={item} />
        </Box>
      ))}
    </Box>
  );
}
