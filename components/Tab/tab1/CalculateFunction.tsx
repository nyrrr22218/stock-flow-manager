import { TItemAndInput } from '@/types/Tabtype/tab1';
import { Typography } from '@mui/material';

interface CalculateFunctionProps {
  item: TItemAndInput;
}

export const CalculateFunction = ({ item }: CalculateFunctionProps) => {
  const order = Number(item.ordertable?.order_count ?? 0);
  const stock = Number(item.stocktable?.stock_count ?? 0);
  const product = Number(item.producttable?.producted_count ?? 0);
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
