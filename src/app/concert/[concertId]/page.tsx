'use client';

import { useParams } from 'next/navigation';
import Button from '@/components/common/Button';
import DetailImgSection from '@/components/detail/DetailImgSection';
import LineupSection from '@/components/detail/LineupSection';
import ConcertContentSection from '@/components/detail/ConcertContentSection';
import ConcertStorySection from '@/components/detail/ConcertStorySection';
import DetailHeader from '@/components/detail/DetailHeader';
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
    setConcert((prev) => (prev ? { ...prev, isScrapped: result } : prev));
  };
  //스켈레톤 로딩 이후 높이 계산 문제로 스크롤 안되는 버그 해결
  useEffect(() => {
    if (!isLoading) {
      // 1. body와 html의 overflow 설정을 명시적으로 초기화
      // 스크롤바를 숨겨놨기 때문에 브라우저가 간혹 스크롤 가능 상태를 놓칩니다.
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';

      // 2. 브라우저가 레이아웃을 재계산하도록 아주 미세하게 스크롤 이동
      // 0에서 1px만 움직여도 브라우저는 스크롤 가능 여부를 다시 체크합니다.
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }
  }, [isLoading]);
  return (
    <div className="text-white flex flex-col min-h-screen bg-black relative pb-20 relative">
      {isLoading ? (
        <DetailSkeleton />
      ) : !concert ? (
        <div className="min-h-screen flex items-center justify-center text-gray-300 text-base">
          아티스트를 찾을 수 없습니다.
        </div>
      ) : (
        <>
          <DetailHeader title="" />
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
              <span>
                {concert.isFinished
                  ? '공연이 종료되었습니다'
                  : concert.bookUrl
                    ? '예매하러 가기'
                    : '예매 링크가 없습니다'}
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
