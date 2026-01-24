'use client';

import MyHeader from '@/components/my/MyHeader';
import MyArtists from '@/components/my/MyArtists';

export default function MyArtistPage() {
  return (
    <div className="text-white flex flex-col h-screen overflow-y-auto scrollbar bg-black relative">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center mb-13 ">
        <MyHeader title={'스크랩한 아티스트'} />
      </header>
      <MyArtists />
    </div>
  );
}
