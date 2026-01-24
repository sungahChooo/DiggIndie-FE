'use client';
//import artistData from '@/mocks/mockArtistDetail.json';
import { useParams } from 'next/navigation';
import DetailImgSection from '@/components/detail/DetailImgSection';
import ArtistContentSection from '@/components/detail/ArtistContentSection';
import ScheduledConcertSection from '@/components/detail/ScheduledConcertSection';
import EndedConcertSection from '@/components/detail/EndConcertSection';
import DetailHeader from '@/components/detail/DetailHeader';
import default_artist_image from '@/assets/detail/artist_default.svg';
import { useEffect, useState } from 'react';
import { getArtistDetail, scrapArtist } from '@/services/artistsService';
import { ArtistDetail } from '@/types/artists';
import DetailSkeleton from '@/components/detail/DetailSkeleton';
import { useAuthStore } from '@/stores/authStore';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = Number(params.artistId);
  //const artist = artistData.artists.find((a) => a.artistId === bandId);
  const [artist, setArtist] = useState<ArtistDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const [isScrapped, setIsScrapped] = useState(false);
  const { isAuthed } = useAuthStore();
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

  //스켈레톤 로딩 이후 높이 계산 문제로 스크롤 안되는 버그 해결
  useEffect(() => {
    if (!isLoading) {
      // 1. body와 html의 overflow 설정을 명시적으로 초기화
      // 스크롤바를 숨겨놨기 때문에 브라우저가 간혹 스크롤 가능 상태를 놓칩니다.
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';

      // 2. 브라우저가 레이아웃을 재계산하도록 아주 미세하게 스크롤 이동
      // 0에서 1px만 움직여도 브라우저는 스크롤 가능 여부를 다시 체크합니다.
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  //이미지 반환 안 될 시 디폴트 이미지
  const artistImageSrc =
    artist?.artistImage && artist.artistImage.trim() !== ''
      ? artist.artistImage
      : default_artist_image;

  return (
    <div className="text-white flex flex-col relative overflow-y-auto">
      {isLoading ? (
        <DetailSkeleton />
      ) : !artist ? (
        <p className="min-h-screen flex items-center justify-center text-gray-300 text-base">
          아티스트를 찾을 수 없습니다.
        </p>
      ) : (
        <>
          <div className="relative">
            <DetailHeader title="" />
            <DetailImgSection imageSrc={artistImageSrc} alt={artist.artistName} type="artist" />
          </div>
          <ArtistContentSection
            artist={artist}
            onToggleScrap={handleToggleScrap}
            isScrapped={isScrapped}
            isLogined={isAuthed}
          />
          <ScheduledConcertSection artist={artist} />
          <EndedConcertSection artist={artist} />
        </>
      )}
    </div>
  );
}
