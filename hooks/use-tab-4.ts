'use client';

import { TItemnameTable } from '@/schemas';
import { handleAxiosError } from '@/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab4 = (Tab4Data: TItemnameTable[]) => {
  const [itemnameList, setItemnameList] = useState<TItemnameTable[]>(() => {
    if (Tab4Data) return Tab4Data;
    return [];
  });
  const [addNewItemName, setAddNewItemName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/tab4';

  useEffect(() => {
    if (Tab4Data && Tab4Data.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        setItemnameList(data.items);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
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
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
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
        setErrorMessage(data.error);
        return;
      }
      setItemnameList((prev) => prev.filter((item) => String(item.id) !== String(id)));
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('unknownError');
      }
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
