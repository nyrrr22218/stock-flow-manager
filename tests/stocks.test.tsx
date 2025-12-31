import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Stocks from '../components/tab/stocks/stocks';
import { StockDataWithInput } from '@/types';

test('在庫入力が正しく反映されるか', () => {
  const dummyData: StockDataWithInput[] = [
    {
      id: '1',
      item_name: 'テスト商品',
      stock: {
        id: 'stock-1',
        item_name_id: '1',
        stock_count: 10,
      },
      stockInInput: '20',
    },
  ];

  render(<Stocks stockDataWithInput={dummyData} />);

  const input = screen.getByRole('spinbutton') as HTMLInputElement;

  fireEvent.change(input, { target: { value: '999' } });

  expect(input.value).toBe('999');
});
