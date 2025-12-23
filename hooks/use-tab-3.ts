'ise client';

import { TItemProductAndInput } from '@/types/tab-type/tab-3';
import { axiosError, axiosErrorIsCancel } from '@/utils/axiosError';
import { FormatData } from '@/utils/formatdata';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab3 = (formattedData?: TItemProductAndInput[]) => {
  const [product, setProduct] = useState<TItemProductAndInput[]>(FormatData(formattedData));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab3';

  useEffect(() => {
    if (formattedData && formattedData.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: TItemProductAndInput[] = (data.items ?? []).map(
          (item: TItemProductAndInput) => ({
            ...item,
            productedInInput: item.product ? String(item.product.producted_count) : '0',
          }),
        );
        setProduct(itemAndInput);
      } catch (error) {
        axiosErrorIsCancel(error);
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
        items: product,
      });
      if (data.success) {
        setEditMode(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      axiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    setProduct,
    loading,
    handleSave,
    editMode,
    setEditMode,
  };
};
