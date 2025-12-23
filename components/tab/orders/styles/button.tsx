import { Tab1ButtonCommonProps } from '@/types';
import { handleEditToggle } from '@/utils';
import { Box, Button, Typography } from '@mui/material';
import { DialogStyle } from '..';
import { ErrorMessageStyle } from '@/components/commons';

export const Tab1ButtonCommon = ({
  errorMessage,
  setErrorMessage,
  editMode,
  setEditMode,
  loading,
  handleSave,
  open,
  setOpen,
  handleShippingCompleted,
}: Tab1ButtonCommonProps) => {
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <Typography variant="h4">注文管理</Typography>
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <Box sx={{ display: 'flex', gap: 3, mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={editMode || loading}
          onClick={openDialog}
          sx={{ bgcolor: 'blueviolet', mr: 'auto' }}
        >
          {loading ? 'Loading...' : '出荷'}
        </Button>
        <DialogStyle
          open={open}
          closeDialog={closeDialog}
          handleShippingCompleted={handleShippingCompleted}
          loading={loading}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEditToggle(setEditMode)}
            color={editMode ? 'inherit' : 'primary'}
          >
            {editMode ? 'キャンセル' : '編集'}
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!editMode || loading}
            onClick={handleSave}
            sx={{ bgcolor: 'yellowgreen' }}
          >
            {loading ? 'Loading...' : '保存'}
          </Button>
        </Box>
      </Box>
    </>
  );
};
