'use client';

import { useMemo } from 'react';
import ArtistCard from '@/components/home/ArtistCard';
import Image from 'next/image';

import { useUpdateRecBands } from '@/hooks/useRecArtists';
import type { RecArtistItem } from '@/types/artists';

type Props = {
  isLoggedIn: boolean;
};

// 비로그인용 이미지 카드
function GuestArtistCard() {
  return (
    <div className="shrink-0">
      <Image
        src="/mocks/mockArtistImage.png"
        alt="mock artist"
        width={160}
        height={200}
        className="rounded-[8px] object-cover"
        priority={false}
      />
    </div>
  );
}

export default function PersonalArtistRec({ isLoggedIn }: Props) {
  const { bands, isLoading, error } = useUpdateRecBands({
    enabled: isLoggedIn,
  });

  const visibleBands = useMemo<RecArtistItem[]>(() => {
    return [...bands].filter((b) => !!b.bandName);
  }, [bands]);

  return (
    <section className="mt-6 gap-4 w-full px-5 bg-black flex flex-col">
      <div className="flex items-center">
        <span className="text-[20px] font-semibold truncate">리스너님을 위한 추천 아티스트</span>
      </div>

      <div className={`flex overflow-x-auto ${!isLoggedIn ? 'blur-sm' : 'blur-none'}`}>
        <div className="flex w-full gap-4">
          {!isLoggedIn ? (
            <>
              <GuestArtistCard />
              <GuestArtistCard />
              <GuestArtistCard />
              <GuestArtistCard />
            </>
          ) : (
            <>
              {isLoading && <div className="text-[14px] text-[#8C8888]">불러오는 중...</div>}
              {!isLoading && error && <div className="text-[14px] text-[#8C8888]">{error}</div>}

              {!isLoading &&
                !error &&
                visibleBands.map((band) => (
                  <ArtistCard
                    key={band.bandId}
                    artist={{
                      artistId: Number(band.bandId),
                      artistName: band.bandName,
                      keywords: band.keywords,
                      artistImage: band.imageUrl,
                      topTrack: band.topTrack,
                    }}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
