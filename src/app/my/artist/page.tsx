'use client';

import MyHeader from '@/components/my/MyHeader';
import MyArtists from '@/components/my/MyArtists';

export default function MyArtistPage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black relative py-10">
      <MyHeader title={'스크랩한 아티스트'} />
      <MyArtists />
    </div>
  );
}
