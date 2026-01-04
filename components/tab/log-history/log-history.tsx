'use client';

import { ErrorMessage } from '@/components/commons/error-message';

import type { Log } from '@/schemas';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

const SortLogs = dynamic(() => import('./sort').then((mod) => mod.SortLogs), {
  ssr: false,
  loading: () => <Box sx={{ height: 40 }} />,
});

export default function LogHistory({ logData }: { logData: Log[] }) {
  const [sortLogMenu, setSortLogMenu] = useState('');
  const [sortLogMonth, setSortLogMonth] = useState('');
  const [descAscLog, setDescAscLog] = useState<'desc' | 'asc'>('desc');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // filter => sortの順で成形
  const sortLogs = useMemo(() => {
    const filtered = logData.filter((item) => {
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
  }, [logData, descAscLog, sortLogMenu, sortLogMonth]);

  return (
    <Box>
      <Typography variant="h4">各種変更・出荷履歴</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <SortLogs
        sortLogMenu={sortLogMenu}
        setSortLogMenu={setSortLogMenu}
        descAscLog={descAscLog}
        setDescAscLog={setDescAscLog}
        sortLogMonth={sortLogMonth}
        setSortLogMonth={setSortLogMonth}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}>
        {sortLogs.length === 0 && <Typography variant="h5">見つかりませんでした</Typography>}
        {sortLogs.map((l) => (
          <Box
            key={l.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
              p: 1,
            }}
          >
            <Typography>{l.log_message}</Typography>
            <Typography>
              {new Date(l.logged_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
