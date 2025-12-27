import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Paper, Typography } from '@mui/material';
import { ItemDataWithInput } from '@/types';

export default function GraphDisplay({ graphData }: { graphData: ItemDataWithInput[] }) {
  const chartData = graphData.map((item) => ({
    name: item.item_name,
    注文数: Number(item.order?.order_count ?? 0),
    在庫数: Number(item.stock?.stock_count ?? 0),
    生産数: Number(item.product?.produced_count ?? 0),
  }));

  return (
    <Paper sx={{ p: 3, width: '100%', mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        製品数値比較
      </Typography>
      <Box sx={{ width: '100%', overflowX: 'auto', bgcolor: '#f9f9f9' }}>
        <BarChart
          data={chartData}
          width={Math.max(800, graphData.length * 60)}
          height={600}
          margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
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
