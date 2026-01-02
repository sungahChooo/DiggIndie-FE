'use client';
import Header from '@/components/onBoard/Header';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';
import ProgressBar from '@/components/onBoard/ProgressBar';
import ArtisItem from '@/components/onBoard/ArtistItem';
import NoResult from '@/components/onBoard/NoResult';
import { useEffect, useState } from 'react';
import LinkButton from '@/components/common/LinkButton';

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
    <div className="text-white flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto gap-5 flex flex-col">
        <div className="px-5">
          <ProgressBar current={1} total={3} />
        </div>
        <TitleSection
          title={
            <>
              좋아하는
              <br /> 아티스트를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <div className="px-5">
          <SearchSection searchTerm={searchTerm} onChange={setSearchTerm} onSubmit={() => {}} />
        </div>
        <div className="overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4 px-5">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <ArtisItem
                key={artist.id}
                artist={artist}
                isSelected={selectedIds.includes(artist.id)}
                toggleSelect={toggleSelect}
              />
            ))
          ) : (
            <NoResult />
          )}
        </div>
      </div>
      <div className="px-5 pb-5">
        <LinkButton href="/onboard/genre" disabled={selectedIds.length < 2}>
          선택완료
        </LinkButton>
      </div>
    </div>
  );
}
