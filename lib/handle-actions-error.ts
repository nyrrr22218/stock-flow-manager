import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

type ResponseError = {
  success: boolean;
  error?: string;
};

export const handleActionsError = (error: unknown, context: string): ResponseError => {
  console.error(`[${context}]`, error);
  let message = '予期せぬエラーが発生しました';
  if (error instanceof ZodError) {
    message = '入力内容が正しくありません';
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        message = '既に登録されています';
        break;
      case 'P2025':
        message = 'データが見つかりませんでした';
        break;
      default:
        message = `データベースエラー (${error.code})`;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return { success: false, error: message };
};
