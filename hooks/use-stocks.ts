'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { TItemStockAndInput } from '@/types';
import { FormatData } from '@/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useStocks = (formattedData?: TItemStockAndInput[]) => {
  const [stockList, setStockList] = useState<TItemStockAndInput[]>(FormatData(formattedData));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/tab2';

  useEffect(() => {
    if (formattedData && formattedData.length > 0) return;
    setErrorMessage(null);
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
        const err = handleAxiosErrorAndLog(error, 'tab2-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [formattedData]);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.patch(API_PATH, {
        items: stockList,
      });
      setEditMode(false);
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'tab2-handleSave');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    setErrorMessage,
    stockList,
    errorMessage,
    setStockList,
    editMode,
    setEditMode,
    loading,
    handleSave,
  };
};
