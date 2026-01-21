"use client";

import { useMemo, useRef, useState } from "react";
import { OnboardArtist, PageInfo} from '@/types/artists';
import { getArtistsPage } from "@/services/artistsService";

export type SortKey = "updated" | "korean";

//페이지당 12개의 아티스트 로드useOn
export function useOnboardArtists(pageSize: number = 12) {
  const [artists, setArtists] = useState<OnboardArtist[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  // 정렬옵션
  const [sortKey, setSortKey] = useState<SortKey>("updated");

  // fetch 중복방지
  const isFetchingRef = useRef(false);

  // submit 연타 방지
  const requestSeqRef = useRef(0);

  //자동검색 debounce 타이머
  const debounceTimerRef = useRef<number | null>(null);
  const debounceMs = 250;

  const sortArtistsIfNeeded = (list: OnboardArtist[]) => {
    if (sortKey !== "korean") return list;
    return [...list].sort((a, b) => a.bandName.localeCompare(b.bandName, "ko"));
  };

  const loadFirstPage = async (query?: string) => {
    isFetchingRef.current = true;
    const seq = ++requestSeqRef.current;

    try {
      const { artists, pageInfo } = await getArtistsPage({
        page: 0,
        size: pageSize,
        query,
      });

      // 최신 요청만 반영
      if (seq !== requestSeqRef.current) return;

      setArtists(sortArtistsIfNeeded(artists));
      setPageInfo(pageInfo);
      setPage(0);
    } catch (e) {
      console.error(e);
      if (seq !== requestSeqRef.current) return;
      setArtists([]);
      setPageInfo(null);
      setPage(0);
    } finally {
      // 최신 요청만 fetch 끝났다고 처리
      if (seq === requestSeqRef.current) isFetchingRef.current = false;
    }
  };

  //스크롤시 다음페이지
  const loadNextPage = async () => {
    if (isFetchingRef.current) return;
    if (!pageInfo?.hasNext) return;

    isFetchingRef.current = true;
    const seq = ++requestSeqRef.current;

    const nextPage = page + 1;

    try {
      const { artists: nextArtists, pageInfo: nextPageInfo } = await getArtistsPage({
        page: nextPage,
        size: pageSize,
        query: appliedQuery || undefined,
      });

      if (seq !== requestSeqRef.current) return;

      setArtists((prev) => {
        const seen = new Set(prev.map((a) => a.bandId));
        const merged = [...prev];
        for (const a of nextArtists) {
          if (!seen.has(a.bandId)) {
            seen.add(a.bandId);
            merged.push(a);
          }
        }
        // 가나다순이면 병합 후 정렬
        return sortArtistsIfNeeded(merged);
      });

      setPageInfo(nextPageInfo);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      if (seq === requestSeqRef.current) isFetchingRef.current = false;
    }
  };

  const scheduleAutoSearch = (rawValue: string) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(async () => {
      const q = rawValue.trim();

      if (q === "") return;
      setAppliedQuery(q);
      await loadFirstPage(q);
    }, debounceMs);
  };

  //검색창 input 없어질시 다시 원래 표기된 아티스트 로드
  const onChangeSearch = async (value: string) => {
    setSearchTerm(value);

    // input이 완전히 비면 초기 리스트로
    if (value === "") {
      // 대기 중인 자동검색 취소
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);

      setAppliedQuery("");
      await loadFirstPage(undefined);
      return;
    }

    // 한 글자 쳐도 바로 검색 실행
    scheduleAutoSearch(value);
  };

  const onSubmitSearch = async () => {
    // 엔터시 대기 중인 자동검색 취소
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);

    const q = searchTerm.trim();
    setAppliedQuery(q);
    await loadFirstPage(q || undefined);
  };

  const onClearSearch = async () => {
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    setSearchTerm("");
    setAppliedQuery("");
    await loadFirstPage(undefined);
  };

  // sortKey 바뀌면 현재 들고있는 artists만 즉시 정렬
  const sortedArtists = useMemo(() => {
    return sortArtistsIfNeeded(artists);
  }, [artists, sortKey]);

  return {
    artists: sortedArtists,
    pageInfo,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,

    sortKey,
    setSortKey,
    isFetching: isFetchingRef.current,
  };
}
