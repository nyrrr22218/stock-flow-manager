import { Tab4PaperProps } from '@/types';
import { ErrorMessageStyle } from '@/utils';
import { Box, Button, Paper, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Tab4Form = ({
  handleItemAdd,
  addNewItemName,
  setAddNewItemName,
  loading,
  errorMessage,
  setErrorMessage,
}: Tab4PaperProps) => {
  return (
    <>
      <Typography variant="h4">商品追加</Typography>
      <ErrorMessageStyle errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
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
                value={addNewItemName}
                onChange={(e) => setAddNewItemName(e.target.value)}
                error={!!errorMessage}
                helperText={errorMessage}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !addNewItemName.trim()}
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
