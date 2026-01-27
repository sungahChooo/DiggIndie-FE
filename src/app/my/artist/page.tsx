'use client';

import MyHeader from '@/components/my/MyHeader';
import MyArtists from '@/components/my/MyArtists';

export default function MyArtistPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* 고정 영역 */}
      <header className="shrink-0 h-[52px] bg-black z-50">
        <MyHeader title="스크랩한 아티스트" />
      </header>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto scrollbar">
        <MyArtists />
      </div>
    </div>
  );
}