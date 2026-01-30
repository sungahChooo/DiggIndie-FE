
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getArtists } from "@/api/artists";
import type { ArtistItem, ArtistOrder, ArtistPayload } from "@/types/artists";

type SortKey = "updated" | "korean" | "scrap";

function mapSortKeyToOrder(sortKey: SortKey): ArtistOrder {
  if (sortKey === "korean") return "alphabet";
  if (sortKey === "updated") return "recent";
  return "scrap";
}

function mergeUniqueById(prev: ArtistItem[], next: ArtistItem[]) {
  const map = new Map<number, ArtistItem>();
  for (const a of prev) map.set(a.artistId, a);
  for (const a of next) map.set(a.artistId, a);
  return Array.from(map.values());
}

export function useArtistSearch(defaultSize = 20) {
  const size = defaultSize;

  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // 입력값(raw)은 절대 trim하지 않음
  const [sortKey, setSortKey] = useState<SortKey>("scrap");

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

  // API에 실제로 쓴 query/order를 기록 (trim된 query 기준)
  const lastQueryRef = useRef<string>("");
  const lastOrderRef = useRef<ArtistOrder>(order);

  // 무한스크롤 트리거 ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchPage = useCallback(
    async (nextPage: number, mode: "replace" | "append", queryForApi: string, orderForApi: ArtistOrder) => {
      if (mode === "append") setIsFetchingMore(true);
      else setIsFetching(true);

      try {
        const payload: ArtistPayload = await getArtists({
          order: orderForApi,
          query: queryForApi,
          page: nextPage,
          size,
        });

        setPageInfo(payload.pageInfo);

        if (mode === "replace") {
          setArtists(payload.artists ?? []);
        } else {
          setArtists((prev) => mergeUniqueById(prev, payload.artists ?? []));
        }

        lastQueryRef.current = queryForApi;
        lastOrderRef.current = orderForApi;
      } finally {
        if (mode === "append") setIsFetchingMore(false);
        else setIsFetching(false);
      }
    },
    [size]
  );

  const loadFirstPage = useCallback(
    async (override?: { query?: string; sortKey?: SortKey }) => {
      if (override?.query !== undefined) setSearchTerm(override.query); // raw 그대로 저장
      if (override?.sortKey !== undefined) setSortKey(override.sortKey);

      const rawQuery = override?.query ?? searchTerm;
      const queryForApi = rawQuery.trim(); // API에만 trim
      const orderForApi = mapSortKeyToOrder(override?.sortKey ?? sortKey);

      await fetchPage(0, "replace", queryForApi, orderForApi);
    },
    [fetchPage, searchTerm, sortKey]
  );

  const loadNextPage = useCallback(async () => {
    if (isFetching || isFetchingMore) return;
    if (!pageInfo.hasNext) return;

    const expectedQueryForApi = searchTerm.trim();
    const expectedOrderForApi = order;

    if (lastQueryRef.current !== expectedQueryForApi || lastOrderRef.current !== expectedOrderForApi) {
      await loadFirstPage({ query: searchTerm, sortKey });
      return;
    }

    await fetchPage(pageInfo.page + 1, "append", expectedQueryForApi, expectedOrderForApi);
  }, [fetchPage, isFetching, isFetchingMore, pageInfo, searchTerm, order, loadFirstPage, sortKey]);

  const onChangeSearch = useCallback((next: string) => {
    setSearchTerm(next); // 입력값 그대로 (공백 유지)
  }, []);

  //state 내에서 타이핑 문제 해결하여 띄어쓰기 없어짐 해결
  const onSubmitSearch = useCallback(
    async (queryOverride?: string) => {
      const raw = queryOverride ?? searchTerm;
      await loadFirstPage({ query: raw, sortKey });
    },
    [loadFirstPage, searchTerm, sortKey]
  );

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
    loadFirstPage({ query: searchTerm, sortKey });
  }, [order, loadFirstPage, searchTerm, sortKey]);

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
