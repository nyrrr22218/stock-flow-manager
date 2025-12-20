import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TItemAndInput } from '@/types/Tabtype/tab1';
import { Box, Paper, Typography } from '@mui/material';

export default function InventoryAnalytics({ data }: { data: TItemAndInput[] }) {
  const chartData = data.map((item) => ({
    name: item.item_name,
    注文数: Number(item.ordertable?.order_count ?? 0),
    在庫数: Number(item.stocktable?.stock_count ?? 0),
    生産数: Number(item.producttable?.producted_count ?? 0),
  }));

  const MaxGraphWidth = Math.max(800, data.length * 60);
  const MaxGraphHeight = 600;

  return (
    <Paper sx={{ p: 3, width: '100%', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        グラフ
      </Typography>

      {/* 1. 横スクロールを管理する外枠 */}
      <Box sx={{ width: '100%', overflowX: 'auto', bgcolor: '#f9f9f9' }}>
        {/* 2. ResponsiveContainerを使わず、直接BarChartにサイズを渡す */}
        <BarChart
          width={MaxGraphWidth}
          height={MaxGraphHeight}
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={5} // ラベルが切れないように高さを確保
          />
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
