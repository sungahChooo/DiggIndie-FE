'use client';
import { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}
export default function GenreList() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetch('/data/genres.json')
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);
  return (
    <div className="flex flex-wrap gap-4">
      {genres.map((genre) => (
        <span key={genre.id} className="border border-gray-700 rounded-sm px-3 py-2 bg-gray-900">
          {genre.name}
        </span>
      ))}
    </div>
  );
}
