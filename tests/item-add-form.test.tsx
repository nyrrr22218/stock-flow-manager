import { AddItemForm } from '../components/tab/item-management/ui/item-add-form';

import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

test('追加ボタンを押すと handleItemAdd が呼ばれるか', () => {
  const handleItemAddMock = vi.fn((e) => e.preventDefault());
  const setNewItemNameMock = vi.fn();

  render(
    <AddItemForm
      handleItemAdd={handleItemAddMock}
      newItemName="商品A"
      setNewItemName={setNewItemNameMock}
      loading={false}
      errorMessage={null}
      setErrorMessage={vi.fn()}
    />,
  );

  const addButton = screen.getByRole('button', { name: '追加' });
  fireEvent.click(addButton);

  expect(handleItemAddMock).toHaveBeenCalledTimes(1);
});
