'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { Log } from '@/schemas';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

export const useLogHistory = (logData: Log[]) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(() => 'desc');
  const [log, setLog] = useState<Log[]>(() => {
    if (logData) return logData;
    return [];
  });

  useEffect(() => {
    setErrorMessage(null);
    if (logData && logData.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get('/api/log-history', { signal });
        setLog(data.logsData || []);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'log-history-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [logData]);

  const sortLogs = useMemo(() => {
    return Array.from(log).sort((a, b) => {
      const dateA = new Date(a.logged_at).getTime();
      const dateB = new Date(b.logged_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [log, sortOrder]);

  return {
    errorMessage,
    setErrorMessage,
    sortOrder,
    setSortOrder,
    sortLogs,
  };
};
