import Image from 'next/image';

interface Artist {
  id: number;
  name: string;
  image: string | null;
}

interface ArtistItemProps {
  artist: Artist;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}
export default function ArtistItem({ artist, isSelected, toggleSelect }: ArtistItemProps) {
  return (
    <div
      key={artist.id}
      className={`cursor-pointer relative w-full aspect-[102/104] border rounded-sm ${
        isSelected ? 'border-red custom-box-shadow' : 'border-gray-700'
      }`}
      onClick={() => {
        toggleSelect(artist.id);
      }}
    >
      {artist.image ? (
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          sizes="(max-width: 375px) 100vw, 33vw"
          className="rounded-sm object-cover z-0"
        />
      ) : (
        <div className="w-full h-full rounded-sm "></div>
      )}
      {/* 오버레이: 선택 여부에 따라 변경 */}
      {isSelected ? (
        <div
          className="absolute inset-0 z-10 rounded-sm
        bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(99,20,21,0.8)_98.08%)]"
        ></div>
      ) : (
        <div className="absolute inset-0 bg-black/60 z-10 rounded-sm"></div>
      )}
      <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-normal z-20 leading-normal">
        {artist.name}
      </p>
    </div>
  );
}
