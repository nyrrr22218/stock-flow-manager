'use client';

import { Box, Typography } from '@mui/material';
import type { Log } from '@/schemas';
import { useLogHistory } from '@/hooks/use-log-history';
import { ErrorMessage } from '@/components/commons/error-message';
import dynamic from 'next/dynamic';

const SortLogs = dynamic(() => import('./sort').then((mod) => mod.SortLogs), {
  ssr: false,
  loading: () => <Box sx={{ height: 40 }} />,
});

export default function LogHistory({ logData }: { logData: Log[] }) {
  const {
    errorMessage,
    setErrorMessage,
    descAscLog,
    setDescAscLog,
    sortLogMenu,
    setSortLogMenu,
    sortLogs,
    sortLogMonth,
    setSortLogMonth,
  } = useLogHistory(logData);

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
