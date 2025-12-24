'use client';

import { useOrders } from '@/hooks/use-orders';
import { Box, Typography } from '@mui/material';
import {
  Calculate,
  numberColumnLayout,
  OrdersButton,
  TextFields,
  DisplayName,
} from '../../commons';
import { Item } from '@/schemas';

export default function Orders({ orderData }: { orderData: Item[] }) {
  const orderDataWithInput = orderData.map((item) => ({
    ...item,
    orderInInput: item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
  }));
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
          <TextFields item={item} editMode={editMode} setTabOneItemList={setOrdersPageList} />
          <Calculate item={item} />
        </Box>
      ))}
    </Box>
  );
}
