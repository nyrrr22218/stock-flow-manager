import { getOrders } from '@/app/actions/order-actions';
import Orders from '@/components/tab/orders/orders';

import { Box } from '@mui/material';

export default async function OrdersPage() {
  const orderDataWithInput = await getOrders();

  if (!Array.isArray(orderDataWithInput)) {
    return <Box>error: {orderDataWithInput.error}</Box>;
  }

  return <Orders orderDataWithInput={orderDataWithInput} />;
}
