'use client';

import { ReactElement, useMemo } from 'react';
import ArtistConcertSkeleton from '@/components/home/ArtistConcertSkeleton';
import ArtistCard from '@/components/home/ArtistCard';
import Image from 'next/image';
import playBtn from '@/assets/common/play.svg';

import { useUpdateRecBands } from '@/hooks/useRecArtists';
import type { RecArtistItem } from '@/types/artists';
import Link from 'next/link';

type Props = {
  isLoggedIn: boolean;
};

type GuestProps = {
  firstImage: boolean;
};

function GuestArtistCard({ firstImage }: GuestProps): ReactElement {
  return (
    <div className="relative shrink-0 w-[160px] h-[200px] rounded-[8px] overflow-hidden">
      <Image
        src={firstImage ? '/mocks/mockArtistImage1.png' : '/mocks/mockArtistImage2.png'}
        alt="artist"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0B0 F1499]" />

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <span className="text-white font-medium text-[16px] ml-3 mb-2">아티스트 이름</span>
        <div className="flex flex-col h-[57px] bg-[#1F1D1D] px-3 py-2">
          <div className={'flex w-full font-normal gap-1'}>
            <Image src={playBtn} alt={'play'} width={20} height={20} />
            <span className={'text-[14px]'}>곡 제목이</span>
          </div>
          <div className={'text-[12px] font-medium text-[#736F6F]'}># 키워드 # 키워드</div>
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
  const isNotOnboarded = isLoggedIn && !isLoading && visibleBands.length === 0;

  return (
    <section className="mt-6 gap-3 w-full px-5 bg-black flex flex-col">
      <div className="flex items-center">
        <span className="text-[20px] font-semibold truncate">리스너님을 위한 추천 아티스트</span>
      </div>

      <div className="flex flex-col w-full">
        {!isLoggedIn && (
          <div className="flex w-full overflow-x-auto gap-4 blur-[3px] opacity-40 pointer-events-none">
            <GuestArtistCard firstImage={true} />
            <GuestArtistCard firstImage={false} />
          </div>
        )}

        {isLoggedIn && (
          <>
            {/* 로딩 중: 스켈레톤 */}
            {isLoading && (
              <div className="flex w-full overflow-x-auto gap-4 scrollbar-hide">
                <ArtistConcertSkeleton />
                <ArtistConcertSkeleton />
                <ArtistConcertSkeleton />
              </div>
            )}

            {/* 로딩 끝 + 온보딩 전*/}
            {!isLoading && isNotOnboarded && (
              <div className="flex flex-col items-center justify-center text-center py-4 bg-[#121212] rounded-[12px] border border-[#2A2A2A]"></div>
            )}
            {/* 로딩 끝 + 데이터 있음 */}
            {!isLoading && !isNotOnboarded && (
              <div className="flex w-full overflow-x-auto gap-4 scrollbar-hide">
                {error && <div className="text-[14px] text-[#8C8888]">{error}</div>}

                {!error &&
                  visibleBands.map((band) => (
                    <div key={band.bandId} className="flex-none w-40">
                      <ArtistCard
                        artist={{
                          artistId: Number(band.bandId),
                          artistName: band.bandName,
                          keywords: band.keywords,
                          artistImage: band.imageUrl,
                          topTrack: band.topTrack,
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
