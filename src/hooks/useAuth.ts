'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginResponse {
  success: boolean;
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/perfil');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao fazer login'
      };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Erro ao registrar usuário');
      }

      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      router.push('/perfil');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao registrar'
      };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return {
    user: session?.user,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading
  };
}
