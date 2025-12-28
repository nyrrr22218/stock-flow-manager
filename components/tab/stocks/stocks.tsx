'use client';

import { useStocks } from '@/hooks/use-stocks';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import type { Stock } from '@/types';
import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';
import { InputStyle } from '@/styles/input-layout';
import { ErrorMessage } from '@/components/commons/error-message';
import { ButtonCommon } from '@/components/commons/button-common';

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
    handleSave,
    errorMessage,
  } = useStocks(stockDataWithInput);

  useHandleBeforeUnload(editMode);

  return (
    <Box>
      <Typography variant="h4">在庫管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon editMode={editMode} setEditMode={setEditMode} handleSave={handleSave} />
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
              InputProps={{
                readOnly: !editMode,
              }}
              sx={{ ...InputStyle }}
              onClick={() => {
                if (!editMode) setEditMode(true);
              }}
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
