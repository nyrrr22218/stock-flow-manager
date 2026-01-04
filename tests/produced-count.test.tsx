import ProducedCount from '@/components/tab/produced-count/products';

import type { ProducedCountDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

test('生産数入力が正しく反映されるか', () => {
  const dummyData: ProducedCountDataWithInput[] = [
    {
      id: '1',
      item_name: 'テスト商品',
      product: {
        id: 'stock-1',
        item_name_id: '1',
        produced_count: 10,
      },
      producedInInput: '20',
    },
  ];

  render(<ProducedCount productDataWithInput={dummyData} />);

  const input = screen.getByRole('spinbutton') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '999' } });

  expect(input.value).toBe('999');
});
