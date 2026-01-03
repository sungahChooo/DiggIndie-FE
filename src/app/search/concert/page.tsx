'use client'

import SearchConcert from '@/components/search/SearchConcert';
import SearchHeader from '@/components/search/SearchHeader';

export default function MyArtistPage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <SearchHeader title={"공연"}/>
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto bg-black">
          <SearchConcert />
        </div>
      </div>
    </div>
  );
}