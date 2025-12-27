import { CalculateProps } from '@/types';
import { Typography } from '@mui/material';

export const Calculate = ({ item }: CalculateProps) => {
  const order = Number(item.orderInInput ?? 0);
  const stock = Number(item.stock?.stock_count ?? 0);
  const product = Number(item.product?.produced_count ?? 0);
  const restOrder = Math.max(0, order - stock);
  const finalRestOrder = Math.max(0, restOrder - product);

  return (
    <>
      <Typography align="right">{stock}</Typography>
      <Typography align="right">{restOrder}</Typography>
      <Typography align="right">{product}</Typography>
      <Typography align="right">{finalRestOrder}</Typography>
    </>
  );
};
