
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getMagazines } from "@/api/magazine";
import type { MagazineItem, MagazineOrder } from "@/types/magazine";

type Options = {
  order?: MagazineOrder;
  query?: string;
  size?: number;
  enabled?: boolean;
};

export function useMagazines(options: Options = {}) {
  const {
    order = "recent",
    query,
    size = 20,
    enabled = true,
  } = options;

  const [magazines, setMagazines] = useState<MagazineItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // order / query / size 바뀌면 reload 트리거용 키
  const depsKey = useMemo(
    () => `${order}__${query ?? ""}__${size}`,
    [order, query, size]
  );

  const loadFirstPage = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    try {
      const res = await getMagazines({
        order,
        query,
        page: 0,
        size,
      });

      setMagazines(res.payload.magazines ?? []);
      setHasNext(!!res.payload.pageInfo?.hasNext);
      setPage(0);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, order, query, size]);

  const loadNextPage = useCallback(async () => {
    if (!enabled || !hasNext || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await getMagazines({
        order,
        query,
        page: nextPage,
        size,
      });

      setMagazines((prev) => [
        ...prev,
        ...(res.payload.magazines ?? []),
      ]);
      setHasNext(!!res.payload.pageInfo?.hasNext);
      setPage(nextPage);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, hasNext, isLoading, order, page, query, size]);

  useEffect(() => {
    loadFirstPage();
  }, [depsKey, loadFirstPage]);

  return {
    magazines,
    isLoading,
    hasNext,
    loadNextPage,
    reload: loadFirstPage,
  };
}
