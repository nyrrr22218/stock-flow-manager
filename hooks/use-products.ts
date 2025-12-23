'ise client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { TItemProductAndInput } from '@/types';
import { FormatData } from '@/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useProducts = (formattedData?: TItemProductAndInput[]) => {
  const [product, setProduct] = useState<TItemProductAndInput[]>(FormatData(formattedData));
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/tab3';

  useEffect(() => {
    if (formattedData && formattedData.length > 0) return;
    setErrorMessage(null);
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
        const err = handleAxiosErrorAndLog(error, 'tab3-useEffect');
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
        items: product,
      });
      setEditMode(false);
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'tab3-handleSave');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    setProduct,
    loading,
    errorMessage,
    setErrorMessage,
    handleSave,
    editMode,
    setEditMode,
  };
};
