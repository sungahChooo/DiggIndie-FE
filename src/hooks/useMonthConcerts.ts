"use client";

import { useEffect, useRef, useState } from "react";
import { getMonthConcerts } from "@/api/concerts";
import type { MonthConcertPayload } from "@/types/concerts";

type Params = {
  year: number;
  month: number;
  enabled?: boolean;
};

export function useMonthConcerts({ year, month, enabled = true }: Params) {
  const [data, setData] = useState<MonthConcertPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reqIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const reqId = ++reqIdRef.current;
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getMonthConcerts({ year, month });

        if (cancelled || reqId !== reqIdRef.current) return;

        if (!res?.isSuccess || !res.payload) {
          throw new Error(res?.message ?? "월별 캘린더 조회 실패");
        }

        setData(res.payload);
      } catch (e) {
        if (cancelled || reqId !== reqIdRef.current) return;
        setData(null);
        setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
      } finally {
        if (cancelled || reqId !== reqIdRef.current) return;
        setIsLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled, year, month]);

  return { data, isLoading, error };
}
