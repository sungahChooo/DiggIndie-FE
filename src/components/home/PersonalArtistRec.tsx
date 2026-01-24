'use client';

import { useMemo } from 'react';
import ArtistCard from '@/components/home/ArtistCard';
import Image from 'next/image';
import playBtn from '@/assets/common/play.svg'

import { useUpdateRecBands } from '@/hooks/useRecArtists';
import type { RecArtistItem } from '@/types/artists';

type Props = {
  isLoggedIn: boolean;
};

function GuestArtistCard() {
  return (
    <div className="relative shrink-0 w-[160px] h-[200px] rounded-[8px] overflow-hidden">
      <Image
        src="/mocks/mockArtistImage.png"
        alt="mock artist"
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#0B0F1499]" />

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <span className="text-white font-medium text-[16px] ml-3 mb-2">아티스트 이름</span>
        <div className="flex flex-col h-[57px] bg-[#1F1D1D] px-3 py-2">
          <div className={"flex w-full font-normal gap-1"}>
            <Image src={playBtn} alt={"play"} width={20} height={20} />
            <span className={"text-[14px]"}>
              곡 제목이
            </span>
          </div>
          <div className={"text-[12px] font-medium text-[#736F6F]"}>
            # 키워드 # 키워드
          </div>
        </div>
      </div>
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
    <section className="mt-6 gap-3 w-full px-5 bg-black flex flex-col">
      <div className="flex items-center">
        <span className="text-[20px] font-semibold truncate">리스너님을 위한 추천 아티스트</span>
      </div>

        <div className={`flex overflow-x-auto ${!isLoggedIn ? 'bg-[#0B0F1466] blur-[3px]' : 'blur-none'}`}>
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
