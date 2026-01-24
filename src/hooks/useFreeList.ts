'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getFreeList } from '@/api/freeBoard';
import type { FreeListPayload, FreeArticle, GetFreeListParams, FreeCategory } from '@/types/freeBoard';

type State = {
  articles: FreeArticle[];
  pageInfo: FreeListPayload['pageInfo'] | null;
  isLoading: boolean;
  error: string | null;
};

function mapFreeListToArticles(payload: FreeListPayload): FreeArticle[] {
  return payload.boards.map((b) => ({
    boardId: b.boardId,
    category: b.category,
    title: b.title,
    createdAt: b.createdAt,
    views: b.views,
    imageCount: b.imageCount,
  }));
}

function uniqByBoardId(prev: FreeArticle[], next: FreeArticle[]) {
  const map = new Map<number, FreeArticle>();
  for (const a of prev) map.set(a.boardId, a);
  for (const a of next) map.set(a.boardId, a);
  return Array.from(map.values());
}

export function useFreeList(initial: GetFreeListParams) {
  const [params, setParams] = useState<GetFreeListParams>(initial);

  const [state, setState] = useState<State>({
    articles: [],
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
      const res = await getFreeList(params);

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
      const incoming = mapFreeListToArticles(payload);

      setState((s) => {
        const isFirstPage = (params.page ?? 0) === 0;

        return {
          articles: isFirstPage ? incoming : uniqByBoardId(s.articles, incoming),
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

  const setCategory = (category: FreeCategory) => {
    setParams((p) => ({ ...p, category, page: 0 }));
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
