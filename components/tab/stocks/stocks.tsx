'use client';

import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import type { StockDataWithInput } from '@/types';
import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';
import { InputStyle } from '@/styles/input-layout';
import { ErrorMessage } from '@/components/commons/error-message';
import { ButtonCommon } from '@/components/commons/button-common';
import { useState } from 'react';
import { patchStocks } from '@/app/actions/stock-actions';

export default function Stocks({
  stockDataWithInput,
}: {
  stockDataWithInput: StockDataWithInput[];
}) {
  const [stockList, setStockList] = useState(stockDataWithInput);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useHandleBeforeUnload(editMode);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await patchStocks(stockList);
      if (!result.success) {
        setErrorMessage(result.error || '保存に失敗しました');
        return;
      }
      setEditMode(false);
    } catch {
      setErrorMessage('エラー');
    } finally {
      setLoading(false);
    }
  };

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
              id={`stock-input-${st.id}`}
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
