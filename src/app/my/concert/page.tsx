'use client';

import MyHeader from '@/components/my/MyHeader';
import MyConcerts from '@/components/my/MyConcerts';

export default function MyConcertPage() {
  return (
    <div className="text-white flex flex-col h-screen overflow-y-auto scrollbar bg-black relative">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center">
        <MyHeader title={'스크랩한 공연'} />
      </header>
      <MyConcerts />
    </div>
  );
}
