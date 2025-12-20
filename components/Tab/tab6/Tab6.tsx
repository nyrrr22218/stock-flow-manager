import { TItemAndInput } from '@/types/Tabtype/tab1';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InventoryAnalytics from './tab6Graph';

export default function Tab6() {
  const [graphdata, setGraphData] = useState<TItemAndInput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/tab1');
        setGraphData(res.data.items || []);
      } catch {
        console.error('error');
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        状況分析
      </Typography>
      {graphdata.length > 0 ? (
        <InventoryAnalytics data={graphdata} />
      ) : (
        <Typography>分析するデータがありません</Typography>
      )}
    </Box>
  );
}
