import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProductsCount } from '@/types';
import ProducedCount from '@/components/tab/produced-count/products';

test('生産数入力が正しく反映されるか', () => {
  const dummyData: ProductsCount[] = [
    {
      id: '1',
      item_name: 'テスト商品',
      product: {
        id: 'stock-1',
        item_name_id: '1',
        produced_count: 10,
      },
    },
  ];

  render(<ProducedCount productData={dummyData} />);

  const input = screen.getByRole('spinbutton') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '999' } });

  expect(input.value).toBe('999');
});
