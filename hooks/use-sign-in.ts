'use client';

import { signIn } from '@/app/(auth)/actions';
import { useState } from 'react';

export const useSignIn = () => {
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
      const result = await signIn({
        email,
        password,
      });
      if (result?.error) {
        setError(result.error);
      }
    } catch (err: unknown) {
      console.error('[Login_Fatal]', err);
      setError('通信エラーが発生しました');
    } finally {
      setLoading(false);
    }
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
