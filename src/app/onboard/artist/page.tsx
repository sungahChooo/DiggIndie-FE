'use client';
import Header from '@/components/onBoard/Header';
import Button from '@/components/onBoard/Button';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';
import ProgressBar from '@/components/onBoard/ProgressBar';
import ArtistList from '@/components/onBoard/ArtistList';
import { useEffect, useState } from 'react';

interface Artist {
  id: number;
  name: string;
  image: string | null;
}
export default function OnboardArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/artists.json')
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);
  /*장르 선택 함수  */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  //검색어 필터링
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto m-5 gap-5 flex flex-col">
        <ProgressBar current={1} total={3} />

        <TitleSection
          title={
            <>
              좋아하는
              <br /> 아티스트를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <SearchSection searchTerm={searchTerm} onChange={setSearchTerm} />
        <div className="overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4">
          {filteredArtists.map((artist) => {
            return (
              <ArtistList
                key={artist.id}
                artist={artist}
                isSelected={selectedIds.includes(artist.id)}
                toggleSelect={toggleSelect}
              />
            );
          })}
        </div>
      </div>
      <div className="p-5 bg-transparent">
        <Button href="/onboard/genre" disabled={selectedIds.length < 2}>
          선택완료
        </Button>
      </div>
    </div>
  );
}
