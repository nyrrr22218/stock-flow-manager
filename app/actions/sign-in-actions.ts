'use server';

import { createClient } from '@/lib/supabase-server';

import { redirect } from 'next/navigation';

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    return { error: error.message };
  }
  redirect('/main-page/tab/orders');
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('ログアウトエラー:', error.message);
    return { error: 'ログアウトに失敗しました' };
  }
  redirect('/sign-in');
}
