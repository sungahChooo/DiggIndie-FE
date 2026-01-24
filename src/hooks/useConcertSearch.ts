"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getConcerts, type GetConcertParams } from "@/api/concerts";
import type { ConcertItem, PageInfo } from "@/types/concerts";

function mergeUniqueById(prev: ConcertItem[], next: ConcertItem[]) {
  const map = new Map<number, ConcertItem>();
  prev.forEach((c) => map.set(c.concertId, c));
  next.forEach((c) => map.set(c.concertId, c));
  return Array.from(map.values());
}

type Options = {
  order: GetConcertParams["order"];
  query?: string;
  size?: number;
  sort?: string[];
  enabled?: boolean;
};

export function useConcertsSearch(options: Options) {
  const { order, query = "", size = 20, sort, enabled = true } = options;

  const q = useMemo(() => (query ?? "").trim(), [query]);
  const sortKey = useMemo(() => (sort?.length ? JSON.stringify(sort) : ""), [sort]);

  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 0,
    size,
    hasNext: false,
    totalElements: 0,
    totalPages: 0,
  });

  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastQueryRef = useRef<string>("");
  const lastOrderRef = useRef<GetConcertParams["order"]>(order);
  const lastSortRef = useRef<string>(sortKey);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const didLoadFirstPageRef = useRef(false);

  const fetchPage = useCallback(
    async (nextPage: number, mode: "replace" | "append") => {
      if (!enabled) return;

      if (mode === "append") setIsFetchingMore(true);
      else setIsFetching(true);

      try {
        setError(null);

        const res = await getConcerts({
          order,
          query: q,
          page: nextPage,
          size,
          sort,
        });

        const nextConcerts = res.payload?.concerts ?? [];
        const nextPageInfo = res.payload?.pageInfo ?? {
          page: nextPage,
          size,
          hasNext: false,
          totalElements: 0,
          totalPages: 0,
        };

        setPageInfo(nextPageInfo);

        if (mode === "replace") {
          setConcerts(nextConcerts);
          // 첫 페이지 로드 완료 플래그 (요청 성공 시점)
          didLoadFirstPageRef.current = true;
        } else {
          setConcerts((prev) => mergeUniqueById(prev, nextConcerts));
        }

        lastQueryRef.current = q;
        lastOrderRef.current = order;
        lastSortRef.current = sortKey;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");

        if (mode === "replace") {
          setConcerts([]);
          setPageInfo({
            page: 0,
            size,
            hasNext: false,
            totalElements: 0,
            totalPages: 0,
          });
          didLoadFirstPageRef.current = false;
        }
      } finally {
        if (mode === "append") setIsFetchingMore(false);
        else setIsFetching(false);
      }
    },
    [enabled, order, q, size, sort, sortKey]
  );

  const loadFirstPage = useCallback(async () => {
    didLoadFirstPageRef.current = false;
    await fetchPage(0, "replace");
  }, [fetchPage]);

  const loadNextPage = useCallback(async () => {
    if (!enabled) return;
    if (isFetching || isFetchingMore) return;

    // 첫 페이지 로드 끝나기 전 nextPage 요청 금지
    if (!didLoadFirstPageRef.current) return;

    if (!pageInfo.hasNext) return;

    const expectedQuery = q;
    const expectedOrder = order;
    const expectedSort = sortKey;

    if (
      lastQueryRef.current !== expectedQuery ||
      lastOrderRef.current !== expectedOrder ||
      lastSortRef.current !== expectedSort
    ) {
      await loadFirstPage();
      return;
    }

    await fetchPage(pageInfo.page + 1, "append");
  }, [
    enabled,
    isFetching,
    isFetchingMore,
    pageInfo,
    q,
    order,
    sortKey,
    loadFirstPage,
    fetchPage,
  ]);

  // 쿼리 바뀌면 1페이지부터 다시 로드
  useEffect(() => {
    if (!enabled) return;
    loadFirstPage();
  }, [enabled, order, q, sortKey, loadFirstPage]);

  // 무한스크롤
  useEffect(() => {
    if (!enabled) return;
    if (!pageInfo.hasNext) return;

    const el = sentinelRef.current;
    if (!el) return;

    let locked = false;

    const io = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (locked) return;

        locked = true;
        io.unobserve(el);

        try {
          await loadNextPage();
        } finally {
          locked = false;
          io.observe(el);
        }
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enabled, pageInfo.hasNext, loadNextPage]);

  return {
    concerts,
    pageInfo,
    error,
    isFetching,
    isFetchingMore,
    loadFirstPage,
    loadNextPage,
    sentinelRef,
  };
}
