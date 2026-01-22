'use client';

import { calculateStyle } from '@/styles/variants-style';
import type { ItemDataWithInput } from '@/types';

import { Typography } from '@mui/material';

function stockCalculate(order: number, stock: number, product: number) {
  const restOrder = Math.max(0, order - stock);
  const finalRestOrder = Math.max(0, restOrder - product);
  return { stock, restOrder, product, finalRestOrder };
}

export const Calculate = ({ item }: { item: ItemDataWithInput }) => {
  const order = Number(item.orderInInput ?? 0);
  const stock = Number(item.stock?.stockCount ?? 0);
  const product = Number(item.producedCount?.producedCount ?? 0);
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
          ...calculateStyle(result),
        }}
      >
        {result.finalRestOrder}
      </Typography>
    </>
  );
};
