'use client';
import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from './authStore';
import { useRouter } from 'next/navigation';
import Loading from '@/components/auth/Loading';

export default function LoginCallback() {
  const router = useRouter();
  // URL에서 code 추출
  const code =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('code') : null;
  const state =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('state') : null;

  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    (async () => {
      try {
        if (!code) throw new Error('No code');
        if (!state) throw new Error('No state');
        //소셜로그인 & 연동 api 호출
        const res = await authService.socialLogin(code, state);
        console.log('콜백 api 응답 데이터', res);

        if (res.type === 'login') {
          //  로그인 처리
          login(res.loginData.accessToken, String(res.loginData.userId));

          // UI용 최근 로그인 플랫폼 저장
          localStorage.setItem('recent_provider', res.loginData.platform);

          router.push('/home');
          return;
        }
        if (res.type === 'link') {
          // 연동 성공 처리
          alert(`${res.linkData.platform} 계정 연동이 완료되었습니다.`);
          router.push('/my/social');
          return;
        }
      } catch (e: unknown) {
        const err = e as any;
        if (err?.response?.data?.statusCode === 409) {
          router.push(`/my/social?error=${encodeURIComponent(err.response.data.message)}`);
          return;
        }

        // 진짜 예외만 로그인으로
        console.error('Login callback error:', e);
        router.push('/auth/login');
      }
    })();
  }, [code, login, router, state]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
}
