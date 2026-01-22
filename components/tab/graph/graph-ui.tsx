'use client';

import type { Item } from '@/schemas';

import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function GraphDisplay({ graphData }: { graphData: Item[] }) {
  const chartData = graphData.map((item) => ({
    name: item.name,
    注文数: Number(item.order?.orderCount ?? 0),
    在庫数: Number(item.stock?.stockCount ?? 0),
    生産数: Number(item.producedCount?.producedCount ?? 0),
  }));

  return (
    <Paper sx={{ p: { xs: 0, md: 3 }, width: '100%', mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        製品数値比較
      </Typography>
      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          bgcolor: '#f9f9f9',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <BarChart
          data={chartData}
          // データ長に応じ可変,最低幅確保
          width={Math.max(window?.innerWidth < 600 ? 500 : 800, graphData.length * 50)}
          height={window?.innerWidth < 600 ? 400 : 600}
          margin={{ top: 20, right: 10, left: 15, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={5} />
          <YAxis
            unit="枚"
            tick={{ fontSize: 16 }}
            width={50}
            tickCount={10}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="注文数" fill="#1976d2" barSize={30} />
          <Bar dataKey="在庫数" fill="#2e7d32" barSize={30} />
          <Bar dataKey="生産数" fill="#341922" barSize={30} />
        </BarChart>
      </Box>
    </Paper>
  );
}
