import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Orders from '@/components/tab/orders/orders';
import { ItemDataWithInput } from '@/types';

test('注文数入力が正しく反映されるか', () => {
  const dummyData: ItemDataWithInput[] = [
    {
      id: '1',
      item_name: 'テスト商品',
      order: {
        id: 'order-1',
        item_name_id: '1',
        order_count: 10,
      },
      stock: {
        id: 'stock-1',
        item_name_id: '1',
        stock_count: 10,
      },
      product: {
        id: 'product-1',
        item_name_id: '1',
        produced_count: 10,
      },
      orderInInput: '40',
    },
  ];

  render(<Orders orderDataWithInput={dummyData} />);

  const input = screen.getByRole('spinbutton') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '300' } });

  expect(input.value).toBe('300');
});
