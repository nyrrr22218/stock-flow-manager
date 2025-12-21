'ise client';

import { useHandleEditToggle } from '@/hooks/useHandleEditToggle';
import { TItemProductAndInput } from '@/types/Tabtype/tab3';
import { handleAxiosError } from '@/utils/axiosError';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTab3 = () => {
  const { editMode, setEditMode } = useHandleEditToggle();
  const [product, setProduct] = useState<TItemProductAndInput[]>([]);
  const [loading, setLoading] = useState(false);
  const API_PATH = '/api/tab3';

  useEffect(() => {
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: TItemProductAndInput[] = (data.items ?? []).map(
          (item: TItemProductAndInput) => ({
            ...item,
            productedInInput: item.producttable ? String(item.producttable.producted_count) : '0',
          }),
        );
        setProduct(itemAndInput);
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
        items: product,
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
    product,
    setProduct,
    loading,
    handleSave,
    editMode,
    setEditMode,
  };
};
