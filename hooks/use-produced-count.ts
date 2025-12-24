'ise client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { ProductedCountDataWithInput } from '@/types';
import { formatData } from '@/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useProducedCount = (productDataWithInput?: ProductedCountDataWithInput[]) => {
  const [producedCountList, setProducedCountList] = useState<ProductedCountDataWithInput[]>(
    formatData(productDataWithInput),
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/produced-count';

  useEffect(() => {
    if (productDataWithInput && productDataWithInput.length > 0) return;
    setErrorMessage(null);
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get(API_PATH, { signal });
        const itemAndInput: ProductedCountDataWithInput[] = (data.items ?? []).map(
          (item: ProductedCountDataWithInput) => ({
            ...item,
            productedInInput: item.product ? String(item.product.producted_count) : '0',
          }),
        );
        setProducedCountList(itemAndInput);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'producedCount-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [productDataWithInput]);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.patch(API_PATH, {
        items: producedCountList,
      });
      setEditMode(false);
    } catch (error) {
      const err = handleAxiosErrorAndLog(error, 'producedCount-handleSave');
      if (err) setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    producedCountList,
    setProducedCountList,
    loading,
    errorMessage,
    setErrorMessage,
    handleSave,
    editMode,
    setEditMode,
  };
};
