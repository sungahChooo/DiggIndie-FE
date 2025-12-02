'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Artist {
  id: number;
  name: string;
  image: string | null;
}
export default function ArtistList() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetch('/data/artists.json')
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="relative w-full aspect-[102/104] border border-gray-700 rounded-sm"
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
          {/* 검은 오버레이 */}
          <div className="absolute inset-0 bg-black/60 z-10 rounded-sm"></div>
          <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-normal z-20 leading-normal">
            {artist.name}
          </p>
        </div>
      ))}
    </div>
  );
}
