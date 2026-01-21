'use client';

import { useParams } from 'next/navigation';
import Button from '@/components/common/Button';
import DetailImgSection from '@/components/detail/DetailImgSection';
import LineupSection from '@/components/detail/LineupSection';
import ConcertContentSection from '@/components/detail/ConcertContentSection';
import ConcertStorySection from '@/components/detail/ConcertStorySection';
import MyHeader from '@/components/my/MyHeader';
import { useEffect, useState } from 'react';
import { getDetailConcerts, toggleScrapConcert } from '@/services/concertService';
import { ConcertDetail } from '@/types/concerts';
import { useAuthStore } from '@/stores/authStore';
import DetailSkeleton from '@/components/detail/DetailSkeleton';

export default function ConcertDetailPage() {
  const params = useParams<{ concertId: string }>();
  const concertId = Number(params.concertId);
  const [isLoading, setIsLoading] = useState(true);
  const [concert, setConcert] = useState<ConcertDetail | null>(null);

  // zustand에서 로그인 상태 구독
  const isLoggedIn = useAuthStore((state) => state.isAuthed);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getDetailConcerts(concertId);
      setConcert(data);
      setIsLoading(false);
    };

    fetchData();
  }, [concertId]);

  const handleToggleScrap = async () => {
    if (!concert || !isLoggedIn) return;

    const result = await toggleScrapConcert(concert.concertId);
    setConcert((prev) => (prev ? { ...prev, isScraped: result } : prev));
  };

  return (
    <div className="text-white flex flex-col min-h-screen bg-black relative pb-20 overflow-auto">
      {isLoading ? (
        <DetailSkeleton />
      ) : !concert ? (
        <div className="min-h-screen flex items-center justify-center text-gray-300 text-base">
          아티스트를 찾을 수 없습니다.
        </div>
      ) : (
        <>
          <MyHeader title="" />
          <DetailImgSection imageSrc={concert.imageUrl} type="concert" />
          <ConcertContentSection
            isLoggedIn={isLoggedIn}
            concert={concert}
            isScrapped={concert.isScrapped}
            onToggleScrap={handleToggleScrap}
          />
          <LineupSection concert={concert} />
          <ConcertStorySection concert={concert} />
          <div className="px-5 pb-5 fixed bottom-0 w-full max-w-94">
            <Button href={concert.bookUrl} isFinished={concert.isFinished}>
              <span>{concert.isFinished ? '공연이 종료되었습니다' : '예매하러 가기'}</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
