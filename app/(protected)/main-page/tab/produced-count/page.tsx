import { getProducts } from '@/app/actions/produced-count-actions';
import ProducedCount from '@/components/tab/produced-count/products';

import { Box } from '@mui/material';

export default async function ProducedCountPage() {
  const productDataWithInput = await getProducts();

  if (!Array.isArray(productDataWithInput)) {
    return <Box>error: {productDataWithInput.error}</Box>;
  }

  return <ProducedCount productDataWithInput={productDataWithInput} />;
}
