"use client";

import { useEffect, useState } from "react";
import { getWeeklyConcerts } from "@/api/concerts";
import type { WeeklyConcertItem } from "@/types/concerts";

type Options = {
  page?: number;
  size?: number;
  sort?: string[];
};

export function useWeeklyConcerts(date: string, options: Options = {}) {
  const { page = 0, size = 2, sort } = options;

  const [concerts, setConcerts] = useState<WeeklyConcertItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    let alive = true;

    (async () => {
      try {
        setError(null);
        const res = await getWeeklyConcerts({ date, page, size, sort });
        if (!alive) return;

        setConcerts(res.payload.concerts ?? []);
      } catch (e) {
        if (!alive) return;
        setConcerts([]);
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    })();


    return () => {
      alive = false;
    };
  }, [date, page, size, JSON.stringify(sort)]);

  return { concerts, error };
}
