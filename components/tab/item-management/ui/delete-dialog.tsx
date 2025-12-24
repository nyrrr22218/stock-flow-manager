import { ItemName } from '@/schemas';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type DeleteItemDialog = {
  deleteItem: (id: string, itemName: string) => Promise<void>;
  open: boolean;
  selectedItem: ItemName | null;
  closeDialog: () => void;
  loading: boolean;
};

export const DeleteItemDialog = ({
  deleteItem,
  open,
  selectedItem,
  closeDialog,
  loading,
}: DeleteItemDialog) => {
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
