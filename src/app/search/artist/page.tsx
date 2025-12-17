'use client'

import SearchArtist from '@/components/search/SearchArtist';
import SearchHeader from '@/components/search/SearchHeader';

export default function MyArtistPage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <SearchHeader title={"아티스트"}/>
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto bg-black">
          <SearchArtist />
        </div>
      </div>
    </div>
  );
}