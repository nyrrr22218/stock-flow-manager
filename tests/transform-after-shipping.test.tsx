import { transformAfterShipping } from '../hooks/use-orders';

import type { ShippingUpdatedItems } from '@/types/tab-type/orders';

import { expect, test } from 'vitest';

test('出荷完了時に更新されリセットされること', () => {
  const dummyPrev = [
    {
      id: '1',
      name: 'テスト商品',
      orderInInput: '10',
      order: {
        id: 'order-1',
        itemName_id: '1',
        orderCount: 10,
      },
      stock: {
        id: 'stock-1',
        itemName_id: '1',
        stockCount: 100,
      },
      producedCount: {
        id: 'product-1',
        itemName_id: '1',
        producedCount: 5,
      },
    },
  ];

  const dummyApi: ShippingUpdatedItems[] = [
    {
      id: '1',
      stock: { stockCount: 90 },
    },
  ];

  const result = transformAfterShipping(dummyPrev, dummyApi);

  expect(result[0].orderInInput).toBe('0');
  expect(result[0].stock?.stockCount).toBe(90);
  expect(result[0].order?.orderCount).toBe(0);
  expect(result[0].producedCount?.producedCount).toBe(0);
});
