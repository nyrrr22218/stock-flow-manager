import axios from 'axios';

interface AxiosErrorResponse {
  message: string;
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
function handleAxiosError(error: unknown): AxiosErrorResponse {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.error || error.response?.data?.message;
    let message: string;
    if (status === undefined) {
      message = 'ネットワークエラーが発生しました';
    } else {
      switch (status) {
        case 400:
          message = '入力内容が正しくありません';
          break;
        case 401:
          message = '認証期限が切れました';
          break;
        case 403:
          message = 'アクセス権限がありません';
          break;
        case 404:
          message = 'データが見つかりませんでした';
          break;
        case 409:
          message = '既に登録されています';
          break;
        case 500:
          message = 'サーバーエラーです';
          break;
        default:
          message = `エラー (${status})`;
          break;
      }
    }
    return {
      message: serverMessage || message,
      status: status,
      data: error.response?.data,
    };
  }
  return {
    message: error instanceof Error ? error.message : 'Unknown error',
  };
}

export function handleAxiosErrorAndLog(error: unknown, context: string): AxiosErrorResponse | null {
  if (axios.isCancel(error)) return null;
  const err = handleAxiosError(error);
  if (err.data) {
    console.error(`[${context}]`, err.message, err.data);
  } else {
    console.error(`[${context}]`, err.message);
  }
  return err;
}
