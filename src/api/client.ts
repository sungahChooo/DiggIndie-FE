import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { ApiResponse } from '@/types/api';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function fetchClient<T>(url: string, options: FetchOptions): Promise<ApiResponse<T>> {
  const { auth = false, headers, ...rest } = options;
  const token = useAuthStore.getState().accessToken;

  const sendRequest = (t: string | null) =>
    fetch(`${BASE_URL}${url}`, {
      ...rest,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(auth && t ? { Authorization: `Bearer ${t}` } : {}),
        ...headers,
      },
    });
  let res = await sendRequest(token);

  if (res.status === 401 && auth && url !== '/auth/reissue') {
    try {
      // 서비스 함수 재사용
      const newToken = await authService.refreshAccessToken();
      // 새 토큰으로 기존 요청 재시도
      res = await sendRequest(newToken);
    } catch (err) {
      console.log('new access token 재발급 실패', err);
      //useAuthStore.getState().logout(); service 함수에서 이미 실행
    }
  }

  return res.json();
}
