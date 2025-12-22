'use client';
import { TItemStockAndInput } from '@/types/tab-type/tab-2';
import { handleAxiosError } from '@/utils/axiosError';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab2 = (formattedData?: TItemStockAndInput[]) => {
  const [stockList, setStockList] = useState<TItemStockAndInput[]>(() => {
    if (formattedData) return formattedData;
    return [];
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab2';

  useEffect(() => {
    if (formattedData && formattedData.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: TItemStockAndInput[] = (data.items ?? []).map(
          (item: TItemStockAndInput) => ({
            ...item,
            stockInInput: item.stock ? String(item.stock.stock_count) : '0',
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
  }, [formattedData]);

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
    setEditMode,
    loading,
    handleSave,
  };
};
