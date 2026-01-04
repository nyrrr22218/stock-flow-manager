import { Calculate } from '@/components/tab/orders/ui/calculate';

import type { ItemDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

test('計算に結果が画面に表示されるか', () => {
  const dummyData: ItemDataWithInput = {
    id: '1',
    item_name: 'テスト商品',
    order: { id: 'o1', item_name_id: '1', order_count: 10 },
    stock: { id: 's1', item_name_id: '1', stock_count: 10 },
    product: { id: 'p1', item_name_id: '1', produced_count: 5 },
    orderInInput: '30',
  };

  render(<Calculate item={dummyData} />);

  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('20')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument();
});
