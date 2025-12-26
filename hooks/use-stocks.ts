'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { StockDataWithInput } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useStocks = (stockDataWithInput: StockDataWithInput[] = []) => {
  const [stockList, setStockList] = useState(stockDataWithInput);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/stocks';

  useEffect(() => {
    if (stockDataWithInput && stockDataWithInput.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: StockDataWithInput[] = (data.items ?? []).map(
          (item: StockDataWithInput) => ({
            ...item,
            stockInInput: item.stock ? String(item.stock.stock_count) : '0',
          }),
        );
        setStockList(itemAndInput);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'stocks-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [stockDataWithInput]);

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
      const err = handleAxiosErrorAndLog(error, 'stocks-handleSave');
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
