import { Box, Button, Typography } from '@mui/material';
import { DialogStyle } from './tab-1-button-dialog';
import { Tab1ButtonCommonProps } from '@/types/tab-type/tab-1';

export const Tab1ButtonCommon = ({
  handleEditToggle,
  editMode,
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
            onClick={handleEditToggle}
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
