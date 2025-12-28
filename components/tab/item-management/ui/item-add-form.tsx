import { ErrorMessage } from '@/components/commons/error-message';
import type { AddItemFormProps } from '@/types';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

export const AddItemForm = ({
  handleItemAdd,
  newItemName,
  setNewItemName,
  loading,
  errorMessage,
  setErrorMessage,
}: AddItemFormProps) => {
  return (
    <>
      <Typography variant="h4">商品追加</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={0} variant="outlined" sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box
            component="form"
            onSubmit={handleItemAdd}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                label="商品名"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="例: 商品A"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                error={!!errorMessage}
                helperText={errorMessage}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !newItemName.trim()}
              sx={{
                height: 40,
                px: 4,
                bgcolor: 'blueviolet',
                '&:hover': { bgcolor: 'darkorchid' },
              }}
            >
              {loading ? '追加中...' : '追加'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
