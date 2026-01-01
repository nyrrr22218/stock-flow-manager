'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import type { ProducedCountDataWithInput } from '@/types';
import axios from 'axios';
import { useState } from 'react';

export const useProducedCount = (productDataWithInput: ProducedCountDataWithInput[] = []) => {
  const [producedCountList, setProducedCountList] = useState(productDataWithInput);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const API_PATH = '/api/produced-count';

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.patch<{ success: boolean }>(API_PATH, {
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
    errorMessage,
    setErrorMessage,
    handleSave,
    editMode,
    setEditMode,
  };
};
