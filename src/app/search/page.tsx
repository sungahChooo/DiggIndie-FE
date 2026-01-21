'use client';
import SearchSection from '@/components/onBoard/SearchSection';
import back from '@/assets/icons/Arrow-Left.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { mockConcerts } from '@/mocks/mockConcerts';
import { mockArtists } from '@/mocks/mockArtists';
import MockArtistCard from '@/components/home/MockArtistCard';
import HomeConcertCard from '@/components/home/HomeConcertCard';
import mikeIcon from '@/assets/common/Voice 3.svg';
import calendarIcon from '@/assets/common/Calendar.svg';
import documentIcon from '@/assets/sideTab/Document.svg';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import IndieStoryRecard from '@/components/home/IndieStoryRecCard';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';
import { useRouter } from 'next/navigation';
import RecentSearchSection from '@/components/search/RecentSearchSection';
import { searchService } from '@/services/searchService';
import { RecentSearch } from '@/types/searches';
import { useAuthStore } from '@/stores/authStore';

export default function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const { isAuthed } = useAuthStore();

  const router = useRouter();
  //디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400); // 400ms

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSubmit = () => {
    if (!searchTerm.trim()) return;
    setDebouncedTerm(searchTerm); // 엔터 즉시
    setIsSubmitted(true);
  };

  //API 호출
  useEffect(() => {
    if (!isAuthed) return;
    if (!isSubmitted || !debouncedTerm) return;
    searchService.saveRecent({ content: debouncedTerm });
  }, [isSubmitted, debouncedTerm, isAuthed]);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setIsSubmitted(false);
  };

  const loadRecentSearches = async () => {
    const data = await searchService.getRecentSearches();
    setRecentSearches(data);
  };
  useEffect(() => {
    if (!isAuthed) return;
    (async () => {
      setIsLoading(true);
      const data = await searchService.getRecentSearches();
      setIsLoading(false);
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
            setIsSubmitted(false);
            loadRecentSearches();
          }}
          onSubmit={handleSubmit}
        />
      </div>
      {isAuthed && searchTerm === '' && (
        <RecentSearchSection
          searches={recentSearches}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      )}
      {searchTerm !== '' && (
        <>
          <span className="block font-medium text-sm text-gray-400 px-5 py-5">검색결과 00개</span>
          {isLoading ? (
            <SearchCardSkeleton />
          ) : (
            <section className="mb-9">
              <div className="flex gap-1 mb-4 px-5">
                <Image src={mikeIcon} alt="마이크" />
                <span className="text-xl font-semibold text-white">아티스트</span>
                <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5">
                {mockArtists.map((artist) => (
                  <MockArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}
          {isLoading ? (
            <SearchCardSkeleton />
          ) : (
            <section className="mb-9">
              <div className="flex gap-1 mb-4 px-5">
                <Image src={calendarIcon} alt="달력" />
                <span className="text-xl font-semibold text-white">공연</span>
                <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5">
                {mockConcerts.map((concert) => (
                  <HomeConcertCard key={concert.id} concert={concert} />
                ))}
              </div>
            </section>
          )}
          {isLoading ? (
            <SearchCardSkeleton />
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}
