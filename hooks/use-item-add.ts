'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { TItemnameTable } from '@/schemas';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useItemAdd = (itemAddData: TItemnameTable[]) => {
  const [itemnameList, setItemnameList] = useState<TItemnameTable[]>(() => {
    if (itemAddData) return itemAddData;
    return [];
  });
  const [addNewItemName, setAddNewItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/tab4';

  useEffect(() => {
    if (itemAddData && itemAddData.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        setItemnameList(data.items);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosErrorAndLog(error, 'tab4-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [itemAddData]);

  const handleItemAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data } = await axios.post(API_PATH, { item_name: addNewItemName });
      if (data.success) {
        setItemnameList((prev) => [
          ...prev,
          {
            id: data.newItem.id,
            item_name: data.newItem.item_name,
          },
        ]);
        console.log('送信成功');
      }
      setAddNewItemName('');
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'tab4-handleItemAdd');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemnameTable = async (id: string) => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.delete(API_PATH, { data: { id } });
      setItemnameList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'tab4-deleteItemnameTable');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    addNewItemName,
    setAddNewItemName,
    errorMessage,
    setErrorMessage,
    itemnameList,
    loading,
    handleItemAdd,
    deleteItemnameTable,
  };
};
