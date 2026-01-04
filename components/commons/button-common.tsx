'use client';

import { buttonCommonStyles } from '@/styles/commons';

import { Box, Button, Typography } from '@mui/material';

type ButtonCommonProps = {
  editMode: boolean;
  handleSave: () => void;
  handleCancel: () => void;
};

export const ButtonCommon = ({ editMode, handleSave, handleCancel }: ButtonCommonProps) => {
  return (
    <>
      {editMode ? (
        <Box sx={{ ...buttonCommonStyles }}>
          <Button onClick={handleCancel}>キャンセル</Button>
          <Button onClick={handleSave} variant="contained" color="success">
            保存する
          </Button>
        </Box>
      ) : (
        <Typography color="text.secondary" sx={{ ...buttonCommonStyles, mb: 5.6 }}>
          数値を直接クリックして編集できます
        </Typography>
      )}
    </>
  );
};
