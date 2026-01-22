'use client';

import { deleteItem, postItem } from '@/app/actions/item-management-actions';

import type { ItemName } from '@/schemas';

import { useState } from 'react';

export const useItemManagement = () => {
  const [selectedItem, setSelectedItem] = useState<ItemName | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleItemAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !newItemName.trim()) {
      setErrorMessage('使用できません');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await postItem(newItemName);
      if (!result.success) {
        setErrorMessage(result.error || '保存に失敗しました');
        return;
      }
      setNewItemName('');
    } catch {
      setErrorMessage('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // ItemNameをitemNameとしています
  const handleItemDelete = async (id: string, itemName: string) => {
    if (loading) return;
    setLoading(true);
    setOpen(false);
    setErrorMessage(null);
    try {
      const result = await deleteItem(id, itemName);
      if (result.success === false) {
        setErrorMessage(result.error || '削除に失敗しました');
        return;
      }
    } catch {
      setErrorMessage('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (item: ItemName) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  return {
    newItemName,
    setNewItemName,
    errorMessage,
    setErrorMessage,
    loading,
    handleItemAdd,
    handleItemDelete,
    deleteItem,
    open,
    setOpen,
    selectedItem,
    openDialog,
    closeDialog,
  };
};
