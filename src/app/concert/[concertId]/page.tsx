'use client';

import { useParams } from 'next/navigation';
import LinkButton from '@/components/common/LinkButton';
import DetailImgSection from '@/components/detail/DetailImgSection';
import LineupSection from '@/components/detail/LineupSection';
import ConcertContentSection from '@/components/detail/ConcertContentSection';
import ConcertStorySection from '@/components/detail/ConcertStorySection';
import concertData from '@/mocks/mockConcertDetail.json';
import MyHeader from '@/components/my/MyHeader';

export default function ConcertDetailPage() {
  const params = useParams<{ concertId: string }>();
  const concertId = Number(params.concertId);

  const concert = concertData.concerts.find((c) => c.concertId === concertId);

  if (!concert) {
    return <p className="text-white">콘서트를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="text-white flex flex-col min-h-screen bg-black relative">
      <div className="relative">
        <MyHeader title="" />
        <DetailImgSection imageSrc={concert.mainImage} variant="concert" />
      </div>
      <ConcertContentSection concert={concert} />
      <LineupSection concert={concert} />
      <ConcertStorySection concert={concert} />
      <div className="px-5 pb-5 fixed bottom-0 w-full max-w-94">
        <LinkButton href="#">예매하러가기</LinkButton>
      </div>
    </div>
  );
}
