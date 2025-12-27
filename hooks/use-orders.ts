'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { Item } from '@/schemas';
import { ItemDataWithInput, ShippingPost } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useOrders = (orderDataWithInput: ItemDataWithInput[] = []) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ordersPageList, setOrdersPageList] = useState(orderDataWithInput);
  const API_PATH = '/api/orders';

  useEffect(() => {
    if (orderDataWithInput && orderDataWithInput.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get<{ success: boolean; items: Item[] }>(API_PATH, { signal });
        const itemAndInput: ItemDataWithInput[] = (data.items ?? []).map((item) => ({
          ...item,
          orderInInput:
            item.order?.order_count !== undefined ? String(item.order.order_count) : '0',
        }));
        setOrdersPageList(itemAndInput);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'orders-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [orderDataWithInput]);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.patch<{ success: boolean }>(API_PATH, {
        items: ordersPageList,
      });
      setEditMode(false);
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'orders-handleSave');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShippingCompleted = async () => {
    if (loading) return;
    setOpen(false);
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data } = await axios.post<ShippingPost>('/api/shipments', {
        items: ordersPageList,
      });
      if (data.success) {
        setOrdersPageList((prev) =>
          prev.map((list) => {
            const updated = data.shippingUpdatedItems.find((u) => u.id === list.id);
            return {
              ...list,
              orderInInput: '0',
              stock: list.stock
                ? {
                    ...list.stock,
                    stock_count: updated ? updated.stock.stock_count : list.stock.stock_count,
                  }
                : list.stock,
              order: list.order ? { ...list.order, order_count: 0 } : list.order,
              product: list.product ? { ...list.product, produced_count: 0 } : list.product,
            };
          }),
        );
        setEditMode(false);
      }
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'orders-handleShippingCompleted');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    errorMessage,
    setErrorMessage,
    ordersPageList,
    setOrdersPageList,
    editMode,
    setEditMode,
    loading,
    handleSave,
    open,
    setOpen,
    handleShippingCompleted,
  };
};
