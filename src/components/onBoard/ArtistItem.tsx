import Image from "next/image";
import type { Artist } from "@/types/artists"; // types에서 불러오기

interface ArtistItemProps {
  artist: Artist;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}

export default function ArtistItem({ artist, isSelected, toggleSelect }: ArtistItemProps) {
  return (
    <div
      key={artist.bandId}
      className={`cursor-pointer relative w-full aspect-[102/104] border rounded-sm ${
        isSelected ? "border-main-red-2 custom-box-shadow" : "border-gray-700"
      }`}
      onClick={() => toggleSelect(artist.bandId)}
    >
      {artist.imageUrl ? (
        <Image
          src={artist.imageUrl}
          alt={artist.bandName}
          fill
          sizes="(max-width: 375px) 100vw, 33vw"
          className="rounded-sm object-cover z-0"
        />
      ) : (
        <div className="w-full h-full rounded-sm" />
      )}

      {isSelected ? (
        <div
          className="absolute inset-0 z-10 rounded-sm
          bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(99,20,21,0.8)_98.08%)]"
        />
      ) : (
        <div className="absolute inset-0 bg-black/60 z-10 rounded-sm" />
      )}

      <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-normal z-20 leading-normal">
        {artist.bandName}
      </p>
    </div>
  );
}
