import { Alert } from '@mui/material';

type ErrorMessageProps = {
  errorMessage: string | null;
  clearError: () => void;
};

export const ErrorMessage = ({ errorMessage, clearError }: ErrorMessageProps) => {
  if (!errorMessage) return null;
  return (
    errorMessage && (
      <Alert severity="error" variant="filled" sx={{ mt: 2, mb: 2 }} onClose={clearError}>
        {errorMessage}
      </Alert>
    )
  );
};
