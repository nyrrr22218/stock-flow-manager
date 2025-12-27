'use client';

import { handleAxiosErrorAndLog } from '@/lib/axios-error';
import { Log } from '@/schemas';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

export const useLogHistory = (logData: Log[]) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [descAscLog, setDescAscLog] = useState<'desc' | 'asc'>('desc');
  const [sortLogMenu, setSortLogMenu] = useState('');
  const [sortLogMonth, setSortLogMonth] = useState('');
  const [log, setLog] = useState(logData || []);

  useEffect(() => {
    setErrorMessage(null);
    if (logData && logData.length > 0) return;
    const fetchData = async (signal?: AbortSignal) => {
      try {
        const { data } = await axios.get('/api/log-history', { signal });
        setLog(data.logsData || []);
      } catch (error) {
        const err = handleAxiosErrorAndLog(error, 'logHistory-useEffect');
        if (err) setErrorMessage(err.message);
      }
    };
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [logData]);

  const sortLogs = useMemo(() => {
    const filtered = log.filter((item) => {
      if (sortLogMonth !== '') {
        const d = new Date(item.logged_at);
        const logYearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (logYearMonth !== sortLogMonth) return false;
      }
      if (sortLogMenu !== '' && !item.log_message.includes(sortLogMenu)) {
        return false;
      }
      return true;
    });
    return filtered.sort((a, b) => {
      const dateA = new Date(a.logged_at).getTime();
      const dateB = new Date(b.logged_at).getTime();
      return descAscLog === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [log, descAscLog, sortLogMenu, sortLogMonth]);

  return {
    errorMessage,
    setErrorMessage,
    descAscLog,
    setDescAscLog,
    sortLogMenu,
    setSortLogMenu,
    sortLogMonth,
    setSortLogMonth,
    sortLogs,
  };
};
