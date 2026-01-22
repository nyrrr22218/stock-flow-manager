import Stocks from '../components/tab/stocks/stocks';

import type { StockDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

test('在庫入力が正しく反映されるか', () => {
  const dummyData: StockDataWithInput[] = [
    {
      id: '1',
      name: 'テスト商品',
      stock: {
        id: 'stock-1',
        itemName_id: '1',
        stockCount: 10,
      },
      stockInInput: '20',
    },
  ];

  render(<Stocks stockDataWithInput={dummyData} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '999' } });

  expect(input.value).toBe('999');
});
