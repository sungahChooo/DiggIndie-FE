import { Artist } from "@/types/mocks/mockArtists";
import { ImageTile } from "@/components/home/ImageTile";

type Props = {
  artist: Artist;
};

export default function TodayArtistRecCard({ artist }: Props) {
  return (
    <div className="flex flex-col flex-none w-[184px]">
      <ImageTile
        src={artist.imageUrl}
        alt={artist.name}
        variant="todayArtistRec"
        className={"rounded-[4px]"}
      />
      <div className="flex justify-center h-[30px] mt-[8px]">
        <span>{artist.name}</span>
      </div>
    </div>
  );
}
