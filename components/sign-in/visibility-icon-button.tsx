import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

type VisibilityIconButtonProps = {
  reverseVisibility: () => void;
  showpassword: boolean;
};

export const VisibilityIconButton = ({
  reverseVisibility,
  showpassword,
}: VisibilityIconButtonProps) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={reverseVisibility} edge="end" sx={{ color: 'skyblue' }}>
        {showpassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
