import ProducedCount from '@/components/tab/produced-count/products';

import type { ProducedCountDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

test('生産数入力が正しく反映されるか', () => {
  const dummyData: ProducedCountDataWithInput[] = [
    {
      id: '1',
      name: 'テスト商品',
      producedCount: {
        id: 'stock-1',
        itemName_id: '1',
        producedCount: 10,
      },
      producedInInput: '20',
    },
  ];

  render(<ProducedCount productDataWithInput={dummyData} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '999' } });

  expect(input.value).toBe('999');
});
