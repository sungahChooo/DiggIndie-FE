'use client';

import { useEffect, useState } from 'react';
import { postUpdateBandRecommendations } from '@/api/artists';
import type { RecArtistItem } from '@/types/artists';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

type State = {
  bands: RecArtistItem[];
  isLoading: boolean;
  error: string | null;
};

type Options = {
  enabled?: boolean;
};

export function useUpdateRecBands(options: Options = {}) {
  const { enabled = true } = options;

  const accessToken = useAuthStore((s) => s.accessToken);

  const [state, setState] = useState<State>({
    bands: [],
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

        // accessToken이 없으면 refresh 시도
        if (!accessToken) {
          try {
            await authService.refreshAccessToken();
          } catch {
            throw new Error('No refresh cookie / failed to reissue access token');
          }
        }

        const payload = await postUpdateBandRecommendations();
        console.log('홈 아티스트 추천 데이터', payload);
        const bands = payload?.bands ?? [];

        if (!mounted) return;
        setState({ bands, isLoading: false, error: null });
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : 'Failed to update recommended artists';

        setState({ bands: [], isLoading: false, error: msg });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, accessToken]);

  return {
    bands: state.bands,
    isLoading: state.isLoading,
    error: state.error,
  };
}
