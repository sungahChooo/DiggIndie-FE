'use client';
//import artistData from '@/mocks/mockArtistDetail.json';
import { useParams } from 'next/navigation';
import DetailImgSection from '@/components/detail/DetailImgSection';
import ArtistContentSection from '@/components/detail/ArtistContentSection';
import ScheduledConcertSection from '@/components/detail/ScheduledConcertSection';
import EndedConcertSection from '@/components/detail/EndConcertSection';
import MyHeader from '@/components/my/MyHeader';
import default_artist_image from '@/assets/detail/artist_default.svg';
import { useEffect, useState } from 'react';
import { getArtistDetail, scrapArtist } from '@/services/artistsService';
import { ArtistDetail } from '@/types/artists';
import DetailSkeleton from '@/components/detail/DetailSkeleton';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = Number(params.artistId);
  //const artist = artistData.artists.find((a) => a.artistId === bandId);
  const [artist, setArtist] = useState<ArtistDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrapped, setIsScrapped] = useState(false);

  const fetchArtist = async () => {
    if (!artistId || Number.isNaN(artistId)) return;
    const res = await getArtistDetail(artistId);
    setArtist(res);
    setIsScrapped(res.isScraped);
  };

  const handleToggleScrap = async () => {
    if (!artist) return;
    try {
      await scrapArtist(artist.artistId);
      setIsScrapped((prev) => !prev);
    } catch {
      setIsScrapped((prev) => !prev);
    }
  };

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        await fetchArtist();
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [artistId]);

  const artistImageSrc =
    artist?.artistImage && artist.artistImage.trim() !== ''
      ? artist.artistImage
      : default_artist_image;

  return (
    <div className="text-white flex flex-col min-h-screen">
      {isLoading ? (
        <DetailSkeleton />
      ) : !artist ? (
        <p className="min-h-screen flex items-center justify-center text-gray-300 text-base">
          아티스트를 찾을 수 없습니다.
        </p>
      ) : (
        <>
          <div className="relative">
            <MyHeader title="" />
            <DetailImgSection imageSrc={artistImageSrc} alt={artist.artistName} type="artist" />
          </div>
          <ArtistContentSection
            artist={artist}
            onToggleScrap={handleToggleScrap}
            isScrapped={isScrapped}
          />
          <ScheduledConcertSection artist={artist} />
          <EndedConcertSection artist={artist} />
        </>
      )}
    </div>
  );
}
