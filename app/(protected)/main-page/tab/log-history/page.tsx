import { getLogs } from '@/app/actions/log-actions';
import LogHistory from '@/components/tab/log-history/log-history';

import { Box } from '@mui/material';

export default async function LogsPage() {
  const logData = await getLogs();
  if (!Array.isArray(logData)) {
    return <Box>error: {logData.error}</Box>;
  }
  return <LogHistory logData={logData} />;
}
