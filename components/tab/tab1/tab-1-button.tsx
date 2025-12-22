import { Box, Button, Typography } from '@mui/material';

interface Tab1ButtonCommonProps {
  editmode: boolean;
  loading: boolean;
  handleSave: () => void;
  handleEditToggle: () => void;
  handleShippingCompleted: () => void;
}

export const Tab1ButtonCommon = ({
  handleEditToggle,
  editmode,
  loading,
  handleSave,
  handleShippingCompleted,
}: Tab1ButtonCommonProps) => {
  return (
    <>
      <Typography variant="h4">注文管理</Typography>
      <Box sx={{ display: 'flex', gap: 3, mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          disabled={editmode || loading}
          onClick={handleShippingCompleted}
          sx={{ bgcolor: 'blueviolet', mr: 'auto' }}
        >
          {loading ? 'Loading...' : '出荷'}
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleEditToggle}
            color={editmode ? 'inherit' : 'primary'}
          >
            {editmode ? 'キャンセル' : '編集'}
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!editmode || loading}
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
