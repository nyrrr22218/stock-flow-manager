import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useSignIn } from '../hooks/use-sign-in';
import { signIn } from '@/app/(auth)/actions';

vi.mock('@/app/(auth)/actions', () => ({
  signIn: vi.fn(),
}));

describe('useSignIn', () => {
  it('ログインに失敗したとき、エラーメッセージがセットされること', async () => {
    vi.mocked(signIn).mockResolvedValue({ error: 'メールアドレスまたはパスワードが違います' });

    const { result } = renderHook(() => useSignIn());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('wrong-password');
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe('メールアドレスまたはパスワードが違います');
    expect(result.current.loading).toBe(false);
  });

  it('通信エラー（例外）が発生したとき、エラーメッセージがセットされること', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.mocked(signIn).mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.error).toBe('通信エラーが発生しました');

    consoleSpy.mockRestore();
  });
});
