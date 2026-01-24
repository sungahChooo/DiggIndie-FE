"use client";

import type { ArtistItem } from "@/types/artists";
import { ImageTile } from "@/components/home/ImageTile";
import Image from "next/image";
import playBtn from "@/assets/common/play.svg";
import artistDefault from "@/assets/detail/artist_default.svg";
import { useRouter } from 'next/navigation';

type Props = {
  artist: ArtistItem;
};

export default function ArtistCard({ artist }: Props) {
  const img = (artist.artistImage ?? "").trim() || artistDefault;
  const router = useRouter();

  return (
    <div
      className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]"
      onClick={() => router.push(`/artist/${artist.artistId}`)}
    >
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px] cursor-pointer">
      <div className="relative flex flex-col">
        <ImageTile
          src={img}
          alt={artist.artistName}
          variant="artistRec"
          className="rounded-t-[4px]"
          gradient="bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {/* 아티스트명 */}
        <div className="absolute text-white z-5 items-center justify-center mt-[130px] mx-[12px] max-w-[136px] truncate">
          {artist.artistName}
        </div>
      </div>

      <div className="flex flex-col w-[160px] h-[57px] mx-[8px]">
        <div className="flex items-center w-[144px] h-[20px] mt-[8px]">
          <Image src={playBtn} alt="Play" width={20} height={20} />

          {/* 대표곡 제목 */}
          {artist.topTrack ? (
            <a
              href={artist.topTrack.externalUrl}
              target="_blank"
              rel="noopener noreferrer" //보안
              className="ml-[3px] max-w-[118px] truncate text-[14px] font-normal flex items-center text-white"
            >
              {artist.topTrack.title}
            </a> //마이 아티스트 대비용
          ) : artist.mainMusic?.trim() ? (
            <span className="ml-[3px] max-w-[118px] truncate text-[14px] font-normal flex items-center text-white">
              {artist.mainMusic}
            </span>
          ) : (
            <span className="ml-[3px] max-w-[118px] truncate text-[14px] font-normal flex items-center text-[#8C8888]">
              대표곡 정보 없음
            </span>
          )}

        </div>

        {/* 키워드  */}
        <div className="h-[21px] max-w-[144px] truncate font-medium text-[12px] text-[#736F6F]">
          {Array.isArray(artist.keywords)
            ? artist.keywords.map((k) => `#${k}`).join(" ")
            : ""}
        </div>
      </div>
    </div>
    </div>
  );
}
