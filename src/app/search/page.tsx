'use client';

import SearchSection from '@/components/onBoard/SearchSection';
import back from '@/assets/icons/Arrow-Left.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ArtistCard from '@/components/home/ArtistCard';
import ConcertCard from '@/components/home/ConcertCard';
import mikeIcon from '@/assets/common/Voice 3.svg';
import calendarIcon from '@/assets/common/Calendar.svg';
import documentIcon from '@/assets/sideTab/Document.svg';
import IndieStoryRecard from '@/components/home/IndieStoryRecCard';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';
import { useRouter } from 'next/navigation';
import RecentSearchSection from '@/components/search/RecentSearchSection';
import { searchService } from '@/services/searchService';
import type { RecentSearch } from '@/types/searches';
import { useAuthStore } from '@/stores/authStore';
import { mockIndieStory } from '@/mocks/mockIndieStory';

import { useArtistSearch } from '@/hooks/useArtistSearch';
import { useConcertsSearch } from '@/hooks/useConcertSearch';

export default function HomeSearch() {
  const router = useRouter();
  const { isAuthed } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState(false);

  const {
    artists,
    loadFirstPage: loadArtistFirstPage,
    isFetching: isArtistFetching,
    pageInfo: artistPageInfo,
  } = useArtistSearch(20);

  const {
    concerts,
    loadFirstPage: loadConcertFirstPage,
    isFetching: isConcertFetching,
    pageInfo: concertPageInfo,
  } = useConcertsSearch({
    order: 'recent',
    query: debouncedTerm,
    size: 20,
    enabled: true,
  });

  // 디바운스
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 검색 실행 (엔터)
  const handleSubmit = () => {
    const q = searchTerm.trim();
    if (!q) return;

    setDebouncedTerm(q);
    setIsSubmitted(true);

    loadArtistFirstPage({ query: q });
    loadConcertFirstPage();
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsSubmitted(false);
  };

  // 최근 검색 저장
  useEffect(() => {
    if (!isAuthed) return;
    if (!isSubmitted || !debouncedTerm.trim()) return;
    searchService.saveRecent({ content: debouncedTerm.trim() });
  }, [isSubmitted, debouncedTerm, isAuthed]);

  // 디바운스된 검색어로 아티스트 조회
  useEffect(() => {
    const q = debouncedTerm.trim();
    if (!q) return;

    loadArtistFirstPage({ query: q });
    // 콘서트는 훅 내부 useEffect가 query 변화 감지해서 loadFirstPage 호출함
  }, [debouncedTerm, loadArtistFirstPage]);

  // 최근 검색 조회
  const loadRecentSearches = async () => {
    const data = await searchService.getRecentSearches();
    setRecentSearches(data);
  };

  useEffect(() => {
    if (!isAuthed) return;

    (async () => {
      setIsRecentLoading(true);
      const data = await searchService.getRecentSearches();
      setIsRecentLoading(false);
      setRecentSearches(data);
    })();
  }, [isAuthed]);

  const handleDelete = async (id: number) => {
    await searchService.deleteRecentSearch(id);
    await loadRecentSearches();
  };

  const handleClearAll = async () => {
    await searchService.clearRecentSearches();
    await loadRecentSearches();
  };

  const artistCount = artistPageInfo?.totalElements ?? artists.length;
  const concertCount = concertPageInfo?.totalElements ?? concerts.length;

  const isAnyFetching = isArtistFetching || isConcertFetching;

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="px-5 py-3 w-full flex gap-1">
        <Image
          src={back}
          alt="이전으로"
          width={24}
          height={24}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />
        <SearchSection
          searchTerm={searchTerm}
          onChange={handleChange}
          onClear={() => {
            setSearchTerm('');
            setDebouncedTerm('');
            setIsSubmitted(false);
            loadRecentSearches();
          }}
          onSubmit={handleSubmit}
        />
      </div>

      {isAuthed && searchTerm === '' && (
        <>
          {isRecentLoading ? (
            <SearchCardSkeleton />
          ) : (
            <RecentSearchSection searches={recentSearches} onDelete={handleDelete} onClearAll={handleClearAll} />
          )}
        </>
      )}

      {searchTerm !== '' && (
        <>
          <span className="block font-medium text-sm text-gray-400 px-5 py-5">
            검색결과 {artistCount + concertCount}개
          </span>

          {isAnyFetching ? (
            <SearchCardSkeleton />
          ) : (
            <>
              <section className="mb-9">
                <div className="flex gap-1 mb-4 px-5">
                  <Image src={mikeIcon} alt="마이크" />
                  <span className="text-xl font-semibold text-white">아티스트</span>
                  <span className="font-medium text-sm text-white px-2 py-1 ml-2">{artistCount}개</span>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5">
                  {artists.map((artist) => (
                    <ArtistCard key={artist.artistId} artist={artist} />
                  ))}
                </div>
              </section>

              <section className="mb-9">
                <div className="flex gap-1 mb-4 px-5">
                  <Image src={calendarIcon} alt="달력" />
                  <span className="text-xl font-semibold text-white">공연</span>
                  <span className="font-medium text-sm text-white px-2 py-1 ml-2">{concertCount}개</span>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5">
                  {concerts.map((concert) => (
                    <ConcertCard key={concert.concertId} concert={concert} />
                  ))}
                </div>
              </section>

              <section className="pb-9">
                <div className="flex gap-1 mb-4 px-5">
                  <Image src={documentIcon} alt="문서" />
                  <span className="text-xl font-semibold text-white">인디 스토리</span>
                  <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5">
                  {mockIndieStory.map((indieStory) => (
                    <IndieStoryRecard key={indieStory.id} indieStory={indieStory} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
