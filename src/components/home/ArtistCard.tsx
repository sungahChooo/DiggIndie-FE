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
  const img =
    (artist.artistImage ?? "").trim().startsWith("http") &&
    !artist.artistImage.includes("open.spotify.com")
      ? artist.artistImage.trim()
      : artistDefault;
  const router = useRouter();

  return (
    <div
      className="flex flex-col flex-none w-full bg-[#1F1D1D] rounded-b-[4px]"
      onClick={() => router.push(`/artist/${artist.artistId}`)}
    >
    <div className="flex w-full flex-col flex-none bg-[#1F1D1D] rounded-b-[4px] cursor-pointer">
      <div className="relative w-full flex flex-col">
        <ImageTile
          src={img}
          alt={artist.artistName}
          variant="artistRec"
          className="rounded-t-[4px]"
          gradient="bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {/* 아티스트명 */}
        <div
          className="absolute left-3 right-3 bottom-2 z-10 truncate text-white text-[16px] font-medium"
        >
          {artist.artistName}
        </div>
      </div>

      <div className="flex flex-col h-[57px] mx-2">
        <div className="flex items-center w-full h-5 mt-2">
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
            </a>
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
