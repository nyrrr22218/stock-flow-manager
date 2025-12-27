'use client';

import { getSupabaseErrorMessage } from '@/lib/handle-supabase-error';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        const msg = getSupabaseErrorMessage(error, 'Login');
        setError(msg);
        return;
      }
    } catch (err: unknown) {
      console.error('[Login_Fatal]', err);
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
    router.push('/main-page/tab/orders');
  };

  const reverseVisibility = () => setShowPassword(!showPassword);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    error,
    loading,
    handleLogin,
    reverseVisibility,
  };
};
