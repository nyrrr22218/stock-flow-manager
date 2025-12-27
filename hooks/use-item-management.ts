'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { ItemName } from '@/schemas';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useItemManagement = (itemNameData: ItemName[] = []) => {
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemName | null>(null);
  const [itemNameList, setItemNameList] = useState(itemNameData);

  const API_PATH = '/api/item-management';

  useEffect(() => {
    if (itemNameData) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get<{ success: boolean; items: ItemName[] }>(API_PATH, {
          signal,
        });
        setItemNameList(data.items);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosErrorAndLog(error, 'itemManagement-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [itemNameData]);

  const handleItemAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data } = await axios.post(API_PATH, { item_name: newItemName });
      if (data.success) {
        setItemNameList((prev) => [
          ...prev,
          {
            id: data.newItem.id,
            item_name: data.newItem.item_name,
          },
        ]);
        console.log('送信成功');
      }
      setNewItemName('');
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'itemManagement-handleItemAdd');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, itemName: string) => {
    if (loading) return;
    setLoading(true);
    setOpen(false);
    setErrorMessage(null);
    try {
      await axios.delete(API_PATH, { data: { id, itemName } });
      setItemNameList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'itemManagement-deleteItem');
      if (err) setErrorMessage(err.message);
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
    itemNameList,
    loading,
    handleItemAdd,
    deleteItem,
    open,
    setOpen,
    selectedItem,
    openDialog,
    closeDialog,
  };
};
