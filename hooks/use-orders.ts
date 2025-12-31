'use client';

import { patchOrders } from '@/app/actions/order-actions';
import { shippingCompleted } from '@/app/actions/shipment-actions';
import type { ItemDataWithInput } from '@/types';
import { ShippingUpdatedItems } from '@/types/tab-type/orders';
import { useState } from 'react';

export const useOrders = (orderDataWithInput: ItemDataWithInput[]) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ordersPageList, setOrdersPageList] = useState(orderDataWithInput);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await patchOrders(ordersPageList);
      if (!result.success) {
        setErrorMessage(result.error || '保存に失敗しました');
        return;
      }
      setEditMode(false);
    } catch {
      setErrorMessage('エラー');
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
      const result = await shippingCompleted(ordersPageList);
      if (result.success === false) {
        setErrorMessage(result.error || '出荷処理に失敗しました');
        setEditMode(false);
        return;
      }
      if ('shippingUpdatedItems' in result) {
        setOrdersPageList((prev) => transformAfterShipping(prev, result.shippingUpdatedItems));
        setEditMode(false);
      }
    } catch {
      setErrorMessage('通信エラーが発生しました');
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

export const transformAfterShipping = (
  prev: ItemDataWithInput[],
  shippingUpdatedItems: ShippingUpdatedItems[],
): ItemDataWithInput[] => {
  return prev.map((list) => {
    const updated = shippingUpdatedItems.find((u) => u.id === list.id);
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
  });
};
