import { env } from '@/lib/env';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { ApiResponse } from '@/types/api';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

function getAccessTokenSafely() {
  try {
    return useAuthStore.getState().accessToken ?? null;
  } catch {
    return null;
  }
}

//온보딩시에만 사용함. 나머지 모두 fetchClient사용
export async function apiFetch<T>(
  path: string,
  options: {
    query?: Record<string, string | number | boolean | null | undefined>;
    useDevAuth?: boolean;
    auth?: boolean;
  } & RequestInit = {}
): Promise<T> {
  const { query, useDevAuth, auth, ...init } = options;

  if (!env.BASE_URL) throw new Error('NEXT_PUBLIC_BASE_URL not set');

  const url = new URL(path, env.BASE_URL);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      url.searchParams.set(k, String(v));
    });
  }

  const headers = new Headers(init.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (useDevAuth) {
    const token = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN;
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  if (auth) {
    const token = getAccessTokenSafely();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }

  // 204
  if (res.status === 204) {
    return undefined as T;
  }

  // 빈 바디
  const text = await res.text().catch(() => '');
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
//--------------------------------------------------------
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchOptions = RequestInit & {
  auth?: boolean;
  baseUrl?: string;
};

export async function fetchClient<T>(url: string, options: FetchOptions): Promise<ApiResponse<T>> {
  const { auth = false, headers, baseUrl, ...rest } = options;
  const token = useAuthStore.getState().accessToken;

  const origin = baseUrl ?? BASE_URL;

  const sendRequest = (t: string | null) =>
    fetch(`${origin}${url}`, {
      ...rest,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(auth && t ? { Authorization: `Bearer ${t}` } : {}),
        ...headers,
      },
    });

  let res = await sendRequest(token);

  //access token 만료 시 재발급 시도
  if (res.status === 401 && auth && token && url !== '/auth/reissue') {
    try {
      const newToken = await authService.refreshAccessToken();
      res = await sendRequest(newToken);
    } catch (err) {
      console.log('new access token 재발급 실패', err);
      const { logout } = useAuthStore.getState();
      logout();

      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
      throw err;
    }
  }

  const data: ApiResponse<T> = await res.json();

  // 서버 에러 / 비즈니스 에러 공통 처리
  if (!res.ok || data.isSuccess === false) {
    const error: any = new Error(data.message);
    error.statusCode = data.statusCode;
    throw error;
  }

  return data;
}
