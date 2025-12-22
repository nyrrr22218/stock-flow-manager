'use client';

import { TItemAndInput } from '@/types/tab-type/tab-1';
import { handleAxiosError } from '@/utils/axiosError';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab1 = (formattedData?: TItemAndInput[]) => {
  const [tabOneItemList, setTabOneItemList] = useState<TItemAndInput[]>(() => {
    if (formattedData) return formattedData;
    return [];
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab1';

  useEffect(() => {
    if (formattedData && formattedData.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: TItemAndInput[] = (data.items ?? []).map((item: TItemAndInput) => ({
          ...item,
          orderInInput:
            item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
        }));
        setTabOneItemList(itemAndInput);
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
        items: tabOneItemList,
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

  const handleShippingCompleted = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.post('/api/shipments', {
        items: tabOneItemList,
      });
      if (data.success) {
        setTabOneItemList((prev) =>
          prev.map((order) => ({
            ...order,
            orderInInput: '0',
            order: order.order ? { ...order.order, order_count: 0 } : order.order,
          })),
        );
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

  const handleEditToggle = () => setEditMode((prev: boolean) => !prev);

  return {
    tabOneItemList,
    setTabOneItemList,
    editMode,
    handleEditToggle,
    loading,
    handleSave,
    handleShippingCompleted,
  };
};
