// @/components/auth/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthed = useAuthStore((state) => state.isAuthed);

  useEffect(() => {
    const restoreLogin = async () => {
      if (isAuthed) return;
      try {
        await authService.refreshAccessToken();
        console.log('[Auth] 세션 복구 성공');
      } catch (err) {
        console.log('[Auth] 기존 세션 없음', err);
      }
    };
    restoreLogin();
  }, [isAuthed]);

  return <>{children}</>;
}
