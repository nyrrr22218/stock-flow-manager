import { stockCalculate } from '@/src/stock-calculator';
import type { ItemDataWithInput } from '@/types';
import { Typography } from '@mui/material';

export const Calculate = ({ item }: { item: ItemDataWithInput }) => {
  const order = Number(item.orderInInput ?? 0);
  const stock = Number(item.stock?.stock_count ?? 0);
  const product = Number(item.product?.produced_count ?? 0);
  const result = stockCalculate(order, stock, product);

  return (
    <>
      <Typography align="right">{result.stock}</Typography>
      <Typography align="right">{result.restOrder}</Typography>
      <Typography align="right">{result.product}</Typography>
      <Typography align="right">{result.finalRestOrder}</Typography>
    </>
  );
};
