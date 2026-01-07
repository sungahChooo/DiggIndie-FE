import { env } from "@/lib/env";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { ApiResponse } from "@/types/api";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function apiFetch<T>(
  path: string,
  options: {
    query?: Record<string, string | number | boolean | null | undefined>;
    useDevAuth?: boolean;
  } & RequestInit = {}
): Promise<T> {
  const { query, useDevAuth, ...init } = options;

  if (!env.BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set");

  const url = new URL(path, env.BASE_URL);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      url.searchParams.set(k, String(v));
    });
  }

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  if (useDevAuth) {
    const token = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function fetchClient<T>(
  url: string,
  options: FetchOptions
): Promise<ApiResponse<T>> {
  const { auth = false, headers, ...rest } = options;
  const token = useAuthStore.getState().accessToken;

  const sendRequest = (t: string | null) =>
    fetch(`${BASE_URL}${url}`, {
      ...rest,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(auth && t ? { Authorization: `Bearer ${t}` } : {}),
        ...headers,
      },
    });

  let res = await sendRequest(token);

  if (res.status === 401 && auth && url !== "/auth/reissue") {
    try {
      const newToken = await authService.refreshAccessToken();
      res = await sendRequest(newToken);
    } catch (err) {
      console.log("new access token 재발급 실패", err);
    }
  }

  return res.json();
}
