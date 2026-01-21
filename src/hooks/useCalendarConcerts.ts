"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getConcertsByDates } from "@/api/concerts";
import type { ConcertItem, PageInfo } from "@/types/concerts";

type Params = {
  dates: string[];
  size?: number;
  enabled?: boolean;
};

function makeDatesKey(dates: string[]) {
  return dates.join("|");
}

export function useCalendarConcerts({
                                              dates,
                                              size = 100,
                                              enabled = true,
                                            }: Params) {
  const datesKey = useMemo(() => makeDatesKey(dates), [dates]);

  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reqIdRef = useRef(0);

  const hasNext = !!pageInfo?.hasNext;

  // dates 바뀌면 초기화
  useEffect(() => {
    setConcerts([]);
    setPageInfo(null);
    setError(null);
    setPage(0);
  }, [datesKey]);

  useEffect(() => {
    if (!enabled) return;

    if (!dates || dates.length === 0) {
      setConcerts([]);
      setPageInfo(null);
      setError(null);
      setIsLoading(false);
      setIsLoadingMore(false);
      return;
    }

    const reqId = ++reqIdRef.current;
    let cancelled = false;

    const run = async () => {
      const firstPage = page === 0;

      if (firstPage) setIsLoading(true);
      else setIsLoadingMore(true);

      setError(null);

      try {
        const res = await getConcertsByDates({ dates, page, size });

        if (cancelled || reqId !== reqIdRef.current) return;

        if (!res?.isSuccess || !res.payload) {
          throw new Error(res?.message ?? "공연 조회 실패");
        }

        const nextItems = res.payload.concerts ?? [];
        const nextPageInfo = res.payload.pageInfo ?? null;

        setPageInfo(nextPageInfo);

        if (firstPage) {
          setConcerts(nextItems);
        } else {
          setConcerts((prev) => {
            // 중복 방지(혹시 서버가 겹치게 내려주는 경우)
            const seen = new Set(prev.map((c) => c.concertId));
            const merged = [...prev];
            for (const item of nextItems) {
              if (seen.has(item.concertId)) continue;
              seen.add(item.concertId);
              merged.push(item);
            }
            return merged;
          });
        }
      } catch (e) {
        if (cancelled || reqId !== reqIdRef.current) return;
        if (page === 0) setConcerts([]);
        setPageInfo(null);
        setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
      } finally {
        if (cancelled || reqId !== reqIdRef.current) return;
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled, datesKey, page, size, dates]);

  const loadMore = () => {
    if (!enabled) return;
    if (isLoading || isLoadingMore) return;
    if (!hasNext) return;
    setPage((p) => p + 1);
  };

  const refetch = () => {
    const reqId = ++reqIdRef.current;
    void reqId;

    setConcerts([]);
    setPageInfo(null);
    setError(null);
    setPage(0);
  };

  return {
    concerts,
    pageInfo,
    hasNext,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refetch,
  };
}
