'use client';

import { useStocks } from '@/hooks/use-stocks';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { TItemStock } from '@/types';
import { ButtonCommon, ErrorMessageStyle } from '@/components/commons';

export default function Stocks({ stocksData }: { stocksData: TItemStock[] }) {
  const formattedData = stocksData.map((item) => ({
    ...item,
    stockInInput: item.stock?.stock_count !== undefined ? String(item.stock.stock_count) : '0',
  }));

  const {
    setErrorMessage,
    stockList,
    setStockList,
    editMode,
    setEditMode,
    loading,
    handleSave,
    errorMessage,
  } = useStocks(formattedData);

  return (
    <Box>
      <Typography variant="h4">在庫管理</Typography>
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon
        editmode={editMode}
        loading={loading}
        setEditMode={setEditMode}
        handleSave={handleSave}
      />
      <Box
        sx={{
          ...gridCommon,
        }}
      >
        {stockList.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {stockList.map((st) => (
          <Paper
            key={st.id}
            elevation={1}
            variant="outlined"
            sx={{
              ...paperCommon,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {st.item_name}
            </Typography>
            <TextField
              type="number"
              value={st.stockInInput ?? ''}
              disabled={!editMode}
              onChange={(e) =>
                setStockList((prev) =>
                  prev.map((i) => (i.id === st.id ? { ...i, stockInInput: e.target.value } : i)),
                )
              }
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
