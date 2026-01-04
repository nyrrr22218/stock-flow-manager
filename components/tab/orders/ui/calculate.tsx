import type { ItemDataWithInput } from '@/types';
import { Typography } from '@mui/material';

function stockCalculate(order: number, stock: number, product: number) {
  const restOrder = Math.max(0, order - stock);
  const finalRestOrder = Math.max(0, restOrder - product);
  return { stock, restOrder, product, finalRestOrder };
}

export const Calculate = ({ item }: { item: ItemDataWithInput }) => {
  const order = Number(item.orderInInput ?? 0);
  const stock = Number(item.stock?.stock_count ?? 0);
  const product = Number(item.product?.produced_count ?? 0);
  const result = stockCalculate(order, stock, product);

  return (
    <>
      <Typography align="right" data-testid="res-stock">
        {result.stock}
      </Typography>
      <Typography align="right" data-testid="res-restOrder">
        {result.restOrder}
      </Typography>
      <Typography align="right" data-testid="res-product">
        {result.product}
      </Typography>
      <Typography
        align="right"
        data-testid="res-finalRestOrder"
        sx={{
          display: 'inline-block',
          width: 'fit-content',
          ml: 'auto',
          pb: 0.2,
          color: result.finalRestOrder > 0 ? 'red' : 'inherit',
          fontWeight: result.finalRestOrder > 0 ? 'bold' : 'normal',
        }}
      >
        {result.finalRestOrder}
      </Typography>
    </>
  );
};
