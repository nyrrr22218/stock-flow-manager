'use client';

import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';
import { patchStocks } from '@/app/actions/stock-actions';

import { InputStyle } from '@/styles/input-layout';
import { gridCommon, paperCommon } from '@/styles/commons';
import { ErrorMessage } from '@/components/commons/error-message';
import { ButtonCommon } from '@/components/commons/button-common';

import type { StockDataWithInput } from '@/types';

import { useState } from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';

export default function Stocks({
  stockDataWithInput,
}: {
  stockDataWithInput: StockDataWithInput[];
}) {
  const [stockList, setStockList] = useState(stockDataWithInput);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  const handleCancel = () => {
    setStockList(stockDataWithInput);
    setEditMode(false);
    setErrorMessage(null);
  };

  return (
    <Box>
      <Typography variant="h4">在庫管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon editMode={editMode} handleSave={handleSave} handleCancel={handleCancel} />
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
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                setStockList((prev) =>
                  prev.map((i) => (i.id === st.id ? { ...i, stockInInput: sanitizedValue } : i)),
                );
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
