import { signIn } from '../app/actions/sign-in-actions';

import { createClient } from '@/lib/supabase-server';

import { redirect } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/supabase-server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('signIn Server Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ログインに失敗したとき、エラーメッセージを返すこと', async () => {
    const mockSignInWithPassword = vi.fn().mockResolvedValue({
      error: { message: 'メールアドレスまたはパスワードが違います' },
    });

    vi.mocked(createClient).mockResolvedValue({
      auth: { signInWithPassword: mockSignInWithPassword },
    } as unknown as SupabaseClient);

    const result = await signIn({
      email: 'test@example.com',
      password: 'wrong-password',
    });

    expect(result?.error).toBe('メールアドレスまたはパスワードが違います');
    expect(redirect).not.toHaveBeenCalled();
  });

  it('ログインに成功したとき、指定のパスへリダイレクトすること', async () => {
    const mockSignInWithPassword = vi.fn().mockResolvedValue({ error: null });

    vi.mocked(createClient).mockResolvedValue({
      auth: { signInWithPassword: mockSignInWithPassword },
    } as unknown as SupabaseClient);

    await signIn({
      email: 'test@example.com',
      password: 'correct-password',
    });

    expect(redirect).toHaveBeenCalledWith('/main-page/tab/orders');
  });
});
