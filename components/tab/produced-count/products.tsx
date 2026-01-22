'use client';

import { useHandleBeforeUnload } from '@/hooks/use-handle-before-unload';
import { patchProducts } from '@/app/actions/produced-count-actions';

import { InputStyle } from '@/styles/input-layout';
import { gridCommon, paperCommon } from '@/styles/commons';
import { ErrorMessage } from '@/components/commons/error-message';
import { ButtonCommon } from '@/components/commons/button-common';

import type { ProducedCountDataWithInput } from '@/types';

import { useState } from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';

export default function ProducedCount({
  productDataWithInput,
}: {
  productDataWithInput: ProducedCountDataWithInput[];
}) {
  const [producedCountList, setProducedCountList] = useState(productDataWithInput);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useHandleBeforeUnload(editMode);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await patchProducts(producedCountList);
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
    setProducedCountList(productDataWithInput);
    setEditMode(false);
    setErrorMessage(null);
  };

  return (
    <Box>
      <Typography variant="h4">生産数管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon editMode={editMode} handleSave={handleSave} handleCancel={handleCancel} />
      <Box
        sx={{
          ...gridCommon,
        }}
      >
        {producedCountList.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {producedCountList.map((pr) => (
          <Paper key={pr.id} elevation={1} variant="outlined" sx={{ ...paperCommon }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {pr.item_name}
            </Typography>
            <TextField
              value={pr.producedInInput}
              InputProps={{
                readOnly: !editMode,
              }}
              sx={{ ...InputStyle }}
              onClick={() => {
                if (!editMode) setEditMode(true);
              }}
              onBlur={() => {
                if (pr.producedInInput === '') {
                  setProducedCountList((prev) =>
                    prev.map((i) => (i.id === pr.id ? { ...i, producedInInput: '0' } : i)),
                  );
                }
              }}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
                setProducedCountList((prev) =>
                  prev.map((i) => (i.id === pr.id ? { ...i, producedInInput: sanitizedValue } : i)),
                );
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
