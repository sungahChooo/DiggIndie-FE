// src/hooks/useMyArtists.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { getMyArtists } from "@/api/artists";
import { useAuthStore } from "@/stores/authStore";
import type { MyArtistsItem, PageInfo } from "@/types/artists";

type State = {
  artists: MyArtistsItem[];
  pageInfo: PageInfo;
  isLoading: boolean;
  error: string | null;
};

type Options = {
  enabled?: boolean;
  page?: number;
  size?: number;
};

function makeDefaultPageInfo(page: number, size: number): PageInfo {
  return {
    page,
    size,
    hasNext: false,
    totalElements: 0,
    totalPages: 0,
  };
}

export function useMyArtists(options: Options = {}) {
  const { enabled = true, page = 0, size = 20 } = options;
  const accessToken = useAuthStore((s) => s.accessToken);

  const [state, setState] = useState<State>({
    artists: [],
    pageInfo: makeDefaultPageInfo(page, size),
    isLoading: false,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await getMyArtists({ page, size });
      setState({ artists: data.artists, pageInfo: data.pageInfo, isLoading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to fetch my artists";
      setState({
        artists: [],
        pageInfo: makeDefaultPageInfo(page, size),
        isLoading: false,
        error: msg,
      });
    }
  }, [page, size]);

  // 첫 마운트: MyConcerts와 동일하게 토큰 준비 전에는 호출하지 않음
  useEffect(() => {
    if (!enabled) return;
    if (!accessToken) return;

    fetch();
  }, [enabled, accessToken, fetch]);

  return {
    artists: state.artists,
    pageInfo: state.pageInfo,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetch,
  };
}
