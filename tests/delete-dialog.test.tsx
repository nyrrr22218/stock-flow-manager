import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { ItemDeleteDialog } from '../components/tab/item-management/ui/delete-dialog';

test('OKボタンを押すと deleteItem が正しい引数で呼ばれるか', () => {
  const deleteItemMock = vi.fn();
  const closeDialogMock = vi.fn();
  const selectedItem = { id: 'item-123', item_name: '消したい商品' };

  render(
    <ItemDeleteDialog
      deleteItem={deleteItemMock}
      open={true}
      selectedItem={selectedItem}
      closeDialog={closeDialogMock}
      loading={false}
    />,
  );

  const okButton = screen.getByRole('button', { name: 'OK' });
  fireEvent.click(okButton);

  expect(deleteItemMock).toHaveBeenCalledWith('item-123', '消したい商品');

  expect(closeDialogMock).toHaveBeenCalled();
});

test('キャンセルボタンを押すと closeDialog が呼ばれるか', () => {
  const closeDialogMock = vi.fn();

  render(
    <ItemDeleteDialog
      deleteItem={vi.fn()}
      open={true}
      selectedItem={{ id: '1', item_name: '商品' }}
      closeDialog={closeDialogMock}
      loading={false}
    />,
  );

  const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
  fireEvent.click(cancelButton);

  expect(closeDialogMock).toHaveBeenCalled();
});
