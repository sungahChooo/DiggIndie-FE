'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthed, ready, setReady } = useAuthStore();

  useEffect(() => {
    const restoreLogin = async () => {
      try {
        // if (!isAuthed) return; //로그인 안되어있을 때에는 reissue 호출 안함
        await authService.refreshAccessToken();
        console.log('[Auth] 세션 복구 성공');
      } catch {
        console.log('[Auth] 기존 세션 없음');
      } finally {
        setReady(true);
      }
    };

    restoreLogin();
  }, [isAuthed, setReady]);

  // 인증 준비 전엔 아무것도 렌더하지 않음
  if (!ready) return null;

  return <>{children}</>;
}
