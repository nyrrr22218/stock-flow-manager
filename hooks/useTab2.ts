'use client';
import { TItemStockAndInput } from '@/types/Tabtype/tab2';
import { handleAxiosError } from '@/utils/axiosError';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHandleEditToggle } from './useHandleEditToggle';

export const useTab2 = () => {
  const { editMode, setEditMode } = useHandleEditToggle();
  const [stockList, setStockList] = useState<TItemStockAndInput[]>([]);
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab2';

  useEffect(() => {
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: TItemStockAndInput[] = (data.items ?? []).map(
          (item: TItemStockAndInput) => ({
            ...item,
            stockInInput: item.stocktable ? String(item.stocktable.stock_count) : '0',
          }),
        );
        setStockList(itemAndInput);
      } catch (error) {
        if (axios.isCancel(error)) return;
        const err = handleAxiosError(error);
        console.error('通信エラー', err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data }: { data: { success: boolean; error?: string } } = await axios.patch(API_PATH, {
        items: stockList,
      });
      if (data.success) {
        setEditMode(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      const err = handleAxiosError(error);
      console.error('通信エラー', err.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    stockList,
    setStockList,
    editMode,
    loading,
    handleSave,
  };
};
