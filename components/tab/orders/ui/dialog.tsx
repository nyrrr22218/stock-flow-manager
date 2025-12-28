import type { DialogsProps } from '@/types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export const Dialogs = ({ open, closeDialog, handleShippingCompleted, loading }: DialogsProps) => {
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>確認</DialogTitle>
      <DialogContent>本当に実行しますか？</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>キャンセル</Button>
        <Button onClick={handleShippingCompleted} variant="contained" disabled={loading}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
