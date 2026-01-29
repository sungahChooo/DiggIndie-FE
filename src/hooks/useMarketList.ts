'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMarketList } from '@/api/marketBoard';
import type {
  MarketListPayload,
  MarketArticle,
  GetMarketListParams,
  MarketCategory,
} from '@/types/marketBoard';

type State = {
  markets: MarketArticle[];
  pageInfo: MarketListPayload['pageInfo'] | null;
  isLoading: boolean;
  error: string | null;
};

function mapMarketListToMarkets(payload: MarketListPayload): MarketArticle[] {
  return payload.markets.map((m) => ({
    marketId: m.marketId,
    title: m.title,
    price: m.price,
    type: m.type,
    nickname: m.nickname,
    timeAgo: m.timeAgo,
    views: m.views,
    scrapCount: m.scrapCount,
    thumbnailUrl: m.thumbnailUrl,
  }));
}

function uniqByMarketId(prev: MarketArticle[], next: MarketArticle[]) {
  const map = new Map<number, MarketArticle>();
  for (const a of prev) map.set(a.marketId, a);
  for (const a of next) map.set(a.marketId, a);
  return Array.from(map.values());
}

export function useMarketList(initial: GetMarketListParams) {
  const [params, setParams] = useState<GetMarketListParams>(initial);

  const [state, setState] = useState<State>({
    markets: [],
    pageInfo: null,
    isLoading: false,
    error: null,
  });

  const requestSeq = useRef(0);

  const hasNext = useMemo(() => {
    return state.pageInfo?.hasNext ?? false;
  }, [state.pageInfo]);

  const refetch = useCallback(async () => {
    const seq = ++requestSeq.current;

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const res = await getMarketList(params);

      if (seq !== requestSeq.current) return;

      if (!res.isSuccess) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: res.message || '목록을 불러오지 못했습니다.',
        }));
        return;
      }

      const payload = res.payload;
      const incoming = mapMarketListToMarkets(payload);

      setState((s) => {
        const isFirstPage = (params.page ?? 0) === 0;

        return {
          markets: isFirstPage ? incoming : uniqByMarketId(s.markets, incoming),
          pageInfo: payload.pageInfo,
          isLoading: false,
          error: null,
        };
      });
    } catch {
      if (seq !== requestSeq.current) return;

      setState((s) => ({
        ...s,
        isLoading: false,
        error: '목록을 불러오지 못했습니다.',
      }));
    }
  }, [params]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const setCategory = (type: MarketCategory) => {
    setParams((p) => ({ ...p, type, page: 0 }));
  };

  const setQuery = (query: string) => {
    setParams((p) => ({ ...p, query, page: 0 }));
  };

  const setPage = (page: number) => {
    setParams((p) => ({ ...p, page }));
  };

  const loadMore = () => {
    if (state.isLoading) return;
    if (!hasNext) return;

    setParams((p) => ({ ...p, page: (p.page ?? 0) + 1 }));
  };

  return {
    params,
    ...state,
    hasNext,
    refetch,
    loadMore,
    setParams,
    setCategory,
    setQuery,
    setPage,
  };
}
