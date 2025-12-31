import { expect, test } from 'vitest';
import { transformAfterShipping } from '../hooks/use-orders';
import { ShippingUpdatedItems } from '@/types/tab-type/orders';

test('出荷完了時に更新されリセットされること', () => {
  const dummyPrev = [
    {
      id: '1',
      item_name: 'テスト商品',
      orderInInput: '10',
      order: {
        id: 'order-1',
        item_name_id: '1',
        order_count: 10,
      },
      stock: {
        id: 'stock-1',
        item_name_id: '1',
        stock_count: 100,
      },
      product: {
        id: 'product-1',
        item_name_id: '1',
        produced_count: 5,
      },
    },
  ];

  const dummyApi: ShippingUpdatedItems[] = [
    {
      id: '1',
      stock: { stock_count: 90 },
    },
  ];

  const result = transformAfterShipping(dummyPrev, dummyApi);

  expect(result[0].orderInInput).toBe('0');
  expect(result[0].stock?.stock_count).toBe(90);
  expect(result[0].order?.order_count).toBe(0);
  expect(result[0].product?.produced_count).toBe(0);
});
