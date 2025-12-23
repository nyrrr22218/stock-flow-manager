import { Alert } from '@mui/material';

type ErrorMessageStyleProps = {
  errorMessage: string | null;
  clearError: () => void;
};

export const ErrorMessageStyle = ({ errorMessage, clearError }: ErrorMessageStyleProps) => {
  if (!errorMessage) return null;
  return (
    errorMessage && (
      <Alert severity="error" variant="filled" sx={{ mt: 2, mb: 2 }} onClose={clearError}>
        {errorMessage}
      </Alert>
    )
  );
};
