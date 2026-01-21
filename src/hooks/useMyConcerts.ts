"use client";

import { useCallback, useEffect, useState } from "react";
import type { MyConcertItem } from "@/types/concerts";
import { getMyConcerts } from "@/api/concerts";
import { useAuthStore } from "@/stores/authStore";

type State = {
  concerts: MyConcertItem[];
  isLoading: boolean;
  error: string | null;
};

type Options = {
  enabled?: boolean;
};

export function useMyConcerts(options: Options = {}) {
  const { enabled = true } = options;
  const accessToken = useAuthStore((s) => s.accessToken);

  const [state, setState] = useState<State>({
    concerts: [],
    isLoading: false,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const concerts = await getMyConcerts();
      setState({ concerts, isLoading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to fetch my concerts";
      setState({ concerts: [], isLoading: false, error: msg });
    }
  }, []);

  // 첫마운트
  useEffect(() => {
    if (!enabled) return;
    if (!accessToken) return; // 토큰 준비전 호출방지

    fetch();
  }, [enabled, accessToken, fetch]);

  return {
    concerts: state.concerts,
    isLoading: state.isLoading,
    error: state.error,
    refetch: fetch,
  };
}
