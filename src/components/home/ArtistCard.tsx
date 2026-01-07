import type { Artist } from "@/types/artists";
import { ImageTile } from "@/components/home/ImageTile";
import Image from "next/image";
import playBtn from "@/assets/common/play.svg";
import artistDefault from "@/assets/detail/artist_default.svg";



type Props = {
  artist: Artist;
};

export default function ArtistCard({ artist }: Props) {
  const img = artist.imageUrl ?? artistDefault; //null 대비

  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={img}
          alt={artist.bandName}
          variant="artistRec"
          className={"rounded-t-[4px]"}
          gradient={"bg-gradient-to-t from-black/80 via-black/30 to-transparent"}
        />
        <div className={"absolute z-5 items-center justify-center mt-[130px] mx-[12px]"}>
          {artist.bandName}
        </div>
      </div>

      {/*  popularSong keyWords는 아직 API에 없어서 placeholder사용. 회의 후 추후수정 */}
      <div className="flex flex-col w-[160px] h-[57px] mx-[8px]">
        <div className="flex items-center w-[144px] h-[20px] mt-[8px]">
          <Image src={playBtn} alt={"Play"} width={20} height={20}/>
          <span className={"ml-[3px] text-[14px] text-white font-normal text-[#8C8888]"}>
            대표곡 정보 없음
          </span>
        </div>
        <div className={"h-[21px] text-[#736F6F] text-white font-medium text-[12px]"}>
          {/* #키워드 placeholder */}
        </div>
      </div>
    </div>
  );
}
