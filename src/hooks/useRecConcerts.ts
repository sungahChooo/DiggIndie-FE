"use client";

import { useEffect, useState } from "react";
import type { ConcertItem } from "@/types/concerts";
import { getRecConcerts } from "@/api/concerts";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";

type State = {
  concerts: ConcertItem[];
  isLoading: boolean;
  error: string | null;
};

type Options = {
  enabled?: boolean;
};

export function useRecConcerts(options: Options = {}) {
  const { enabled = true } = options;

  const accessToken = useAuthStore((s) => s.accessToken);

  const [state, setState] = useState<State>({
    concerts: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    let mounted = true;

    (async () => {
      try {
        if (!mounted) return;
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // 새로고침 직후 토큰이 없으면 reissue
        if (!accessToken) {
          await authService.refreshAccessToken();
        }

        const concerts = await getRecConcerts();

        if (!mounted) return;
        setState({ concerts, isLoading: false, error: null });
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : "Failed to fetch recommended concerts";
        setState({ concerts: [], isLoading: false, error: msg });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, accessToken]);

  return {
    concerts: state.concerts,
    isLoading: state.isLoading,
    error: state.error,
  };
}
