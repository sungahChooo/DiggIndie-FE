import Image from 'next/image';
import type { OnboardArtist } from '@/types/artists'; // types에서 불러오기
import artistDefault from '@/assets/detail/artist_default.svg';

interface ArtistItemProps {
  artist: OnboardArtist;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}

export default function OnboardArtistItem({ artist, isSelected, toggleSelect }: ArtistItemProps) {
  return (
    <div
      key={artist.bandId}
      className={`cursor-pointer relative w-full aspect-[102/104] border rounded-sm ${
        isSelected ? 'border-main-red-2 custom-box-shadow' : 'border-gray-700'
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
        <Image
          src={artistDefault}
          alt="기본 아티스트 이미지"
          fill
          sizes="(max-width: 375px) 100vw, 33vw"
          className="rounded-sm object-cover z-0"
        />
      )}

      {isSelected ? (
        <div
          className="absolute inset-0 z-10 rounded-sm
       bg-[linear-gradient(180deg,#00000000_0%,rgba(0,0,0,0.65)_80%)]"
        />
      ) : (
        <div className="absolute inset-0 bg-black/60 z-10 rounded-sm" />
      )}

      <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-normal z-20 leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[6em]">
        {artist.bandName}
      </p>
    </div>
  );
}
