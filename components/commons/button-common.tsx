import { buttonCommonStyles } from '@/styles/commons';
import { handleEditToggle } from '@/utils';
import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type ButtonCommonProps = {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  handleSave: () => void;
};

export const ButtonCommon = ({ editMode, setEditMode, loading, handleSave }: ButtonCommonProps) => {
  return (
    <Box sx={{ ...buttonCommonStyles }}>
      <Button
        variant="contained"
        size="small"
        onClick={() => handleEditToggle(setEditMode)}
        color={editMode ? 'inherit' : 'primary'}
      >
        {editMode ? 'キャンセル' : '編集'}
      </Button>
      <Button variant="contained" size="small" disabled={!editMode || loading} onClick={handleSave}>
        {loading ? 'Loading...' : '保存'}
      </Button>
    </Box>
  );
};
