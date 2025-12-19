import axios from 'axios';

export function handleAxiosError(error: unknown): {
  message: string;
  status?: number;
  data?: unknown;
} {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Unknown error',
  };
}
