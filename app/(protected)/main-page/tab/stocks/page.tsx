import { getStocks } from '@/app/actions/stock-actions';
import Stocks from '@/components/tab/stocks/stocks';

import { Box } from '@mui/material';

export default async function StocksPage() {
  const stockDataWithInput = await getStocks();

  if (!Array.isArray(stockDataWithInput)) {
    return <Box>error: {stockDataWithInput.error}</Box>;
  }

  return <Stocks stockDataWithInput={stockDataWithInput} />;
}
