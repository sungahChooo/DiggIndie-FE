import { Artist } from "@/types/artists";
import { ImageTile } from "@/components/home/ImageTile";
import Image from "next/image";
import playBtn from "../../assets/icons/play.svg"


type Props = {
  artist: Artist;
};

export default function PersonalArtistRecCard({ artist }: Props) {
  const keyOne = artist.keyWords ? artist.keyWords[0] : ''
  const keyTwo = artist.keyWords ? artist.keyWords[1] : ''
  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className={"relative flex flex-col"}>
        <ImageTile
          src={artist.imageUrl}
          alt={artist.name}
          variant="artistRec"
          className={"rounded-t-[4px]"}
          gradient={"bg-gradient-to-t from-black/80 via-black/30 to-transparent"}
        />
        <div className={"absolute z-5 items-center justify-center mt-[130px] mx-[12px]"}>
          {artist.name}
        </div>
      </div>

      <div className="flex flex-col w-[144px] h-[57px] mx-[8px] mt-[8px]">
        <div className="flex items-center w-[144px] h-[20px]">
          <Image src={playBtn} alt={'Play'} />
          <span className={"ml-[3px] text-[14px]"}>{artist.popularSong}</span>
        </div>
        <div className={"text-[#736F6F] text-[13px]"}>
          #{ keyOne } #{ keyTwo }
        </div>
      </div>
    </div>
  );
}
