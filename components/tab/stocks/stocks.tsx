'use client';

import { useStocks } from '@/hooks/use-stocks';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { Stock } from '@/types';
import { ButtonCommon, ErrorMessage } from '@/components';
import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';
import { InputStyle } from '@/styles/input-layout';

export default function Stocks({ stockData }: { stockData: Stock[] }) {
  const stockDataWithInput = stockData.map((item) => ({
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
  } = useStocks(stockDataWithInput);

  useHandleBeforeUnload(editMode);

  return (
    <Box>
      <Typography variant="h4">在庫管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon
        editMode={editMode}
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
              sx={{ ...InputStyle }}
              onBlur={() => {
                if (st.stockInInput === '') {
                  setStockList((prev) =>
                    prev.map((i) => (i.id === st.id ? { ...i, stockInInput: '0' } : i)),
                  );
                }
              }}
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
