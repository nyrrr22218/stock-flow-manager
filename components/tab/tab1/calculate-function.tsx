import { CalculateFunctionProps } from '@/types/tab-type/tab-1';
import { Typography } from '@mui/material';

export const CalculateFunction = ({ item }: CalculateFunctionProps) => {
  const order = Number(item.order?.order_count ?? 0);
  const stock = Number(item.stock?.stock_count ?? 0);
  const product = Number(item.product?.producted_count ?? 0);
  const missingOrder = Math.max(0, order - stock);
  const finalMissingOrder = Math.max(0, missingOrder - product);

  return (
    <>
      <Typography align="right">{stock}</Typography>
      <Typography align="right">{missingOrder}</Typography>
      <Typography align="right">{product}</Typography>
      <Typography align="right">{finalMissingOrder}</Typography>
    </>
  );
};
