export const getSupabaseErrorMessage = (error: { message: string }, context: string) => {
  console.error(`[${context}]`, error.message);

  switch (error.message) {
    case 'Invalid login credentials':
      return 'メールアドレスまたはパスワードが正しくありません';
    case 'Email not confirmed':
      return 'メールアドレスが確認されていません';
    default:
      return 'ログインに失敗しました。再度お試しください';
  }
};
