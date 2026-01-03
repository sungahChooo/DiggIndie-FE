'use client';
import SearchSection from '@/components/onBoard/SearchSection';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { mockConcerts } from '@/mocks/mockConcerts';
import { mockArtists } from '@/mocks/mockArtists';
import back from '@/assets/icons/Arrow-Left.svg';
import PersonalArtistRecCard from '@/components/home/PersonalArtistRecCard';
import PersonalConcertRecCard from '@/components/home/PersonalConcertRecCard';
import mikeIcon from '@/assets/common/Voice 3.svg';
import calendarIcon from '@/assets/common/Calendar.svg';
import documentIcon from '@/assets/sidTab/Document.svg';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import IndieStoryRecard from '@/components/home/IndieStoryRecCard';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';

export default function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedTerm, setDebouncedTerm] = useState('');

  //디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400); // 400ms

    return () => clearTimeout(timer);
  }, [searchTerm]);
  const handleSubmit = () => {
    setDebouncedTerm(searchTerm); // 엔터 즉시
  };

  //API 호출
  useEffect(() => {
    if (!debouncedTerm) return;

    fetch(`/concerts?sort=recent&query=${encodeURIComponent(debouncedTerm)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('검색 결과', data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedTerm]);

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="px-5 py-3 w-full flex gap-1">
        <Image src={back} alt="이전으로" />
        <SearchSection
          searchTerm={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          onSubmit={handleSubmit}
        />
      </div>
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
              <PersonalArtistRecCard key={artist.id} artist={artist} />
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
              <PersonalConcertRecCard key={concert.id} concert={concert} />
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
    </div>
  );
}
