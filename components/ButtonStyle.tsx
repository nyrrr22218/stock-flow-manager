import { Box, Button } from '@mui/material';
import { buttonPositionCommon } from '../styles/commons';

interface buttonCommonProps {
  editmode: boolean;
  loading: boolean;
  handleSave: () => void;
  handleEditToggle: () => void;
}

export const ButtonCommon = ({
  handleEditToggle,
  editmode,
  loading,
  handleSave,
}: buttonCommonProps) => {
  return (
    <Box sx={{ ...buttonPositionCommon }}>
      <Button variant="contained" size="small" onClick={handleEditToggle}>
        編集
      </Button>
      <Button variant="contained" size="small" disabled={!editmode || loading} onClick={handleSave}>
        {loading ? 'Loading...' : '保存'}
      </Button>
    </Box>
  );
};
