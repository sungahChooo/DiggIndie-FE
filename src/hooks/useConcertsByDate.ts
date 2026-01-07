"use client";

import { useEffect, useMemo, useState } from "react";
import { getConcerts } from "@/services/concertService";
import type { ConcertItem } from "@/types/concerts";

export type UiConcert = {
  id: number;
  time: string;
  title: string;
  location: string;
};

function toUiConcert(item: ConcertItem): UiConcert {
  const time = item.startsAt?.includes("T") ? item.startsAt.slice(11, 16) : item.startsAt;

  return {
    id: item.concertId,
    time,
    title: item.concertName,
    location: item.concertHall,
  };
}

type Options = {
  page?: number;
  size?: number; // 위클리 캘린더 고려, 기본값 2
  sort?: string;
  useDevAuth?: boolean;
};

export function useConcertsByDate(date?: string, options: Options = {}) {
  const { page = 0, size = 2, sort, useDevAuth } = options;

  const [concerts, setConcerts] = useState<UiConcert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const key = useMemo(() => JSON.stringify({ date, page, size, sort, useDevAuth }), [
    date,
    page,
    size,
    sort,
    useDevAuth,
  ]);

  useEffect(() => {
    if (!date) return;
    const safeDate = date;

    let alive = true;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await getConcerts({
          date: safeDate,
          page,
          size,
          sort,
          useDevAuth,
        });

        const list = (res.payload?.concerts ?? []).slice(0, size).map(toUiConcert);

        if (!alive) return;
        setConcerts(list);
      } catch (e) {
        if (!alive) return;
        setConcerts([]);
        setError(e instanceof Error ? e.message : "Failed to load concerts");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [key]);

  return { concerts, loading, error };
}
