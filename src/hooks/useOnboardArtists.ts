'use client';

import { useRef, useState } from 'react';
import { OnboardArtist, PageInfo } from '@/types/artists';
import { getArtistsPage } from '@/services/artistsService';

//페이지당 12개의 아티스트 로드
export function useOnboardArtists(pageSize: number = 12) {
  const [artists, setArtists] = useState<OnboardArtist[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  // fetch 중복방지
  const isFetchingRef = useRef(false);

  // submit 연타 방지
  const requestSeqRef = useRef(0);

  //자동검색 debounce 타이머
  const debounceTimerRef = useRef<number | null>(null);
  const debounceMs = 250;

  const loadFirstPage = async (query?: string) => {
    isFetchingRef.current = true;
    setIsFetching(true);
    const seq = ++requestSeqRef.current;

    try {
      const { artists, pageInfo } = await getArtistsPage({
        page: 0,
        size: pageSize,
        query,
      });

      if (seq !== requestSeqRef.current) return;

      setArtists(artists);
      setPageInfo(pageInfo);
      setPage(0);
    } catch (e) {
      console.error(e);
      if (seq !== requestSeqRef.current) return;
      setArtists([]);
      setPageInfo(null);
      setPage(0);
    } finally {
      if (seq === requestSeqRef.current) {
        isFetchingRef.current = false;
        setIsFetching(false);
      }
    }
  };

  //스크롤시 다음페이지
  const loadNextPage = async () => {
    if (isFetchingRef.current) return;
    if (!pageInfo?.hasNext) return;

    isFetchingRef.current = true;
    setIsFetching(true);
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
        return merged;
      });

      setPageInfo(nextPageInfo);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      if (seq === requestSeqRef.current) {
        isFetchingRef.current = false;
        setIsFetching(false);
      }
    }
  };

  const scheduleAutoSearch = (rawValue: string) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(async () => {
      const q = rawValue.trim();
      if (q === '') return;

      setAppliedQuery(q);
      await loadFirstPage(q);
    }, debounceMs);
  };

  //검색창 input 없어질시 다시 원래 표기된 아티스트 로드
  const onChangeSearch = async (value: string) => {
    setSearchTerm(value);

    if (value === '') {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);

      setAppliedQuery('');
      await loadFirstPage(undefined);
      return;
    }

    scheduleAutoSearch(value);
  };

  const onSubmitSearch = async () => {
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);

    const q = searchTerm.trim();
    setAppliedQuery(q);
    await loadFirstPage(q || undefined);
  };

  const onClearSearch = async () => {
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    setSearchTerm('');
    setAppliedQuery('');
    await loadFirstPage(undefined);
  };

  return {
    artists,
    pageInfo,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,
    isFetching,
  };
}
