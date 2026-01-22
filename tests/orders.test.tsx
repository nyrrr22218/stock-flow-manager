import Orders from '@/components/tab/orders/orders';

import type { ItemDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

test('注文数入力が正しく反映されるか', () => {
  const dummyData: ItemDataWithInput[] = [
    {
      id: '1',
      name: 'テスト商品',
      order: {
        id: 'order-1',
        itemName_id: '1',
        orderCount: 10,
      },
      stock: {
        id: 'stock-1',
        itemName_id: '1',
        stockCount: 10,
      },
      producedCount: {
        id: 'product-1',
        itemName_id: '1',
        producedCount: 10,
      },
      orderInInput: '40',
    },
  ];

  render(<Orders orderDataWithInput={dummyData} />);

  const input = screen.getByRole('spinbutton') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '300' } });

  expect(input.value).toBe('300');
});
