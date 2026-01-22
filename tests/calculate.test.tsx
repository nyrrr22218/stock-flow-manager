import { Calculate } from '@/components/tab/orders/ui/calculate';

import type { ItemDataWithInput } from '@/types';

import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

test('計算に結果が画面に表示されるか', () => {
  const dummyData: ItemDataWithInput = {
    id: '1',
    name: 'テスト商品',
    order: { id: 'o1', itemName_id: '1', orderCount: 10 },
    stock: { id: 's1', itemName_id: '1', stockCount: 10 },
    producedCount: { id: 'p1', itemName_id: '1', producedCount: 5 },
    orderInInput: '30',
  };

  render(<Calculate item={dummyData} />);

  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('20')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument();
});
