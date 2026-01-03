'use client';

import MyHeader from '@/components/my/MyHeader';
import MyConcerts from '@/components/my/MyConcerts';

export default function MyConcertPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'스크랩한 공연'} />
      <MyConcerts />
    </div>
  );
}
