import { buttonCommonStyles } from '@/styles/commons';
import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type ButtonCommonProps = {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
};

export const ButtonCommon = ({ editMode, setEditMode, handleSave }: ButtonCommonProps) => {
  return (
    <>
      {editMode ? (
        <Box sx={{ ...buttonCommonStyles }}>
          <Button onClick={() => setEditMode(false)}>キャンセル</Button>
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
