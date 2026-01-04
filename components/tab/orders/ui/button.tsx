'use client';

import { InputStyle } from '@/styles/input-layout';
import { buttonCommonStyles } from '@/styles/commons';
import { ErrorMessage } from '@/components/commons/error-message';

import type { OrdersButtonProps } from '@/types';

import { Dialogs } from './dialog';
import { Box, Button, Typography } from '@mui/material';

export const OrdersButton = ({
  errorMessage,
  setErrorMessage,
  editMode,
  setEditMode,
  loading,
  handleSave,
  open,
  setOpen,
  handleShippingCompleted,
}: OrdersButtonProps) => {
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <Typography variant="h4">注文管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <Box sx={{ display: 'flex', gap: 3, mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={editMode || loading}
          onClick={openDialog}
          sx={{ bgcolor: 'blueviolet', mr: 'auto', maxHeight: 60 }}
        >
          {loading ? 'Loading...' : '出荷'}
        </Button>
        <Dialogs
          open={open}
          closeDialog={closeDialog}
          handleShippingCompleted={handleShippingCompleted}
          loading={loading}
        />
        <Box sx={{ ...InputStyle, display: 'flex', gap: 2 }}>
          {editMode ? (
            <Box sx={{ ...buttonCommonStyles }}>
              <Button onClick={() => setEditMode(false)}>キャンセル</Button>
              <Button onClick={handleSave} variant="contained" color="success">
                保存する
              </Button>
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ ...buttonCommonStyles, mb: 5.5 }}>
              数値を直接クリックして編集できます
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
