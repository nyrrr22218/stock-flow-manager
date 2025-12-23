'use client';

import { TItemnameTable } from '@/types/tab-type/tab-4';
import { axiosError, axiosErrorIsCancel } from '@/utils/axiosError';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab4 = (Tab4Data: TItemnameTable[]) => {
  const [itemnameList, setItemnameList] = useState<TItemnameTable[]>(() => {
    if (Tab4Data) return Tab4Data;
    return [];
  });
  const [addNewItemName, setAddNewItemName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab4';

  useEffect(() => {
    if (Tab4Data && Tab4Data.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        setItemnameList(data.items);
      } catch (error) {
        axiosErrorIsCancel(error);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [Tab4Data]);

  const handleItemAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
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
      } else {
        console.log('失敗');
      }
      setAddNewItemName('');
    } catch (error) {
      axiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemnameTable = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(API_PATH, { data: { id } });
      if (!data.success) {
        setError(data.error);
        return;
      }
      setItemnameList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      axiosError(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknownError');
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    addNewItemName,
    setAddNewItemName,
    error,
    itemnameList,
    loading,
    handleItemAdd,
    deleteItemnameTable,
  };
};
