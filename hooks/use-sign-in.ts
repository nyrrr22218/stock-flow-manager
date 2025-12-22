'use client';

import { createSupabaseClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createSupabaseClient();

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
        setError(error.message);
        return;
      }
      router.push('/main-page/tab/orders');
    } catch {
      setError('予期せぬエラー');
    } finally {
      setLoading(false);
    }
  };

  const reverseVisibility = () => setShowpassword(!showpassword);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showpassword,
    error,
    loading,
    handleLogin,
    reverseVisibility,
  };
};
