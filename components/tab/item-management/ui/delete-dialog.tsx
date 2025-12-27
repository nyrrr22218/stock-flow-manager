import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ItemDeleteDialogProps } from '@/types';

export const ItemDeleteDialog = ({
  deleteItem,
  open,
  selectedItem,
  closeDialog,
  loading,
}: ItemDeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>確認</DialogTitle>
      <DialogContent>本当に実行しますか？</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>キャンセル</Button>
        <Button
          onClick={() => {
            if (selectedItem) {
              deleteItem(selectedItem.id, selectedItem.item_name);
            }
            closeDialog();
          }}
          variant="contained"
          disabled={loading}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
