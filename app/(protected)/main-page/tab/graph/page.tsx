import { getOrders } from '@/app/actions/order-actions';
import Graph from '@/components/tab/graph/graph';

import { Box } from '@mui/material';

export default async function GraphPage() {
  const orderDataWithInput = await getOrders();

  if (!Array.isArray(orderDataWithInput)) {
    return <Box>error: {orderDataWithInput.error}</Box>;
  }

  return <Graph graphData={orderDataWithInput} />;
}
