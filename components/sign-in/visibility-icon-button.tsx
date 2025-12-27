import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

type VisibilityIconButtonProps = {
  reverseVisibility: () => void;
  showPassword: boolean;
};

export const VisibilityIconButton = ({
  reverseVisibility,
  showPassword,
}: VisibilityIconButtonProps) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={reverseVisibility} edge="end" sx={{ color: 'skyblue' }}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
