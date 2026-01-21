// src/hooks/useArtistSearch.ts
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getArtists } from "@/api/artists";
import type { ArtistItem, ArtistOrder, ArtistPayload } from "@/types/artists";

type SortKey = "updated" | "korean" | "scrap";

function mapSortKeyToOrder(sortKey: SortKey): ArtistOrder {
  if (sortKey === "korean") return "alphabet";
  if (sortKey === "scrap") return "scrap";
  return "recent";
}

function mergeUniqueById(prev: ArtistItem[], next: ArtistItem[]) {
  const map = new Map<number, ArtistItem>();
  prev.forEach((a) => map.set(a.artistId, a));
  next.forEach((a) => map.set(a.artistId, a));
  return Array.from(map.values());
}

export function useArtistSearch(defaultSize = 20) {
  const size = defaultSize;

  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("updated");

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size,
    hasNext: false,
    totalElements: 0,
    totalPages: 0,
  });

  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const order = useMemo(() => mapSortKeyToOrder(sortKey), [sortKey]);

  const lastQueryRef = useRef<string>("");
  const lastOrderRef = useRef<ArtistOrder>(order);

  // 무한스크롤 트리거 ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(
    async (nextPage: number, mode: "replace" | "append") => {
      const q = searchTerm.trim();

      if (mode === "append") setIsFetchingMore(true);
      else setIsFetching(true);

      try {
        const payload: ArtistPayload = await getArtists({
          order,
          query: q,
          page: nextPage,
          size,
        });

        setPageInfo(payload.pageInfo);

        if (mode === "replace") {
          setArtists(payload.artists ?? []);
        } else {
          setArtists((prev) => mergeUniqueById(prev, payload.artists ?? []));
        }

        lastQueryRef.current = q;
        lastOrderRef.current = order;
      } finally {
        if (mode === "append") setIsFetchingMore(false);
        else setIsFetching(false);
      }
    },
    [order, searchTerm, size]
  );

  const loadFirstPage = useCallback(
    async (override?: { query?: string; sortKey?: SortKey }) => {
      if (override?.query !== undefined) setSearchTerm(override.query);
      if (override?.sortKey !== undefined) setSortKey(override.sortKey);

      const nextQuery = (override?.query ?? searchTerm).trim();
      const nextOrder = mapSortKeyToOrder(override?.sortKey ?? sortKey);

      setIsFetching(true);
      try {
        const payload = await getArtists({
          order: nextOrder,
          query: nextQuery,
          page: 0,
          size,
        });

        setArtists(payload.artists ?? []);
        setPageInfo(payload.pageInfo);

        lastQueryRef.current = nextQuery;
        lastOrderRef.current = nextOrder;
      } finally {
        setIsFetching(false);
      }
    },
    [searchTerm, sortKey, size]
  );

  const loadNextPage = useCallback(async () => {
    if (isFetching || isFetchingMore) return;
    if (!pageInfo.hasNext) return;

    const expectedQuery = searchTerm.trim();
    const expectedOrder = order;

    if (lastQueryRef.current !== expectedQuery || lastOrderRef.current !== expectedOrder) {
      await loadFirstPage({ query: expectedQuery, sortKey });
      return;
    }

    await fetchPage(pageInfo.page + 1, "append");
  }, [fetchPage, isFetching, isFetchingMore, pageInfo, searchTerm, order, loadFirstPage, sortKey]);

  const onChangeSearch = useCallback(async (next: string) => {
    setSearchTerm(next);
  }, []);

  const onSubmitSearch = useCallback(async () => {
    await loadFirstPage({ query: searchTerm.trim(), sortKey });
  }, [loadFirstPage, searchTerm, sortKey]);

  const onClearSearch = useCallback(async () => {
    setSearchTerm("");
    await loadFirstPage({ query: "", sortKey });
  }, [loadFirstPage, sortKey]);

  // IntersectionObserver 기반 무한스크롤
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        loadNextPage();
      },
      {
        root: null,
        rootMargin: "240px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [loadNextPage]);

  // 정렬 변경 시 1페이지부터 다시 로드
  useEffect(() => {
    if (lastOrderRef.current === order) return;
    loadFirstPage({ query: searchTerm.trim(), sortKey });
  }, [order]);

  return {
    artists,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    sortKey,
    setSortKey: (k: SortKey) => setSortKey(k),
    loadFirstPage,
    loadNextPage,
    isFetching,
    isFetchingMore,
    pageInfo,
    sentinelRef,
  };
}
