'use client';
import Button from '@/components/onBoard/Button';
import GenreItem from '@/components/onBoard/GenreItem';
import Header from '@/components/onBoard/Header';
import ProgressBar from '@/components/onBoard/ProgressBar';
import TitleSection from '@/components/onBoard/TitleSection';
import { useEffect, useState } from 'react';

interface Genre {
  id: number;
  name: string;
}
export default function OnBoardGenrePage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  /*장르 더미데이터 불러오기  */
  useEffect(() => {
    fetch('/data/genres.json')
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  /*장르 선택 함수  */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header href="/onboard/artist" />
      <div className="flex-1 overflow-auto m-5 gap-5 flex flex-col">
        <ProgressBar current={2} total={3} />
        <TitleSection
          title={
            <>
              좋아하는 장르나
              <br /> 키워드를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <div className="flex flex-wrap gap-4">
          {genres.map((item) => (
            <GenreItem
              key={item.id}
              genre={item}
              isSelected={selectedIds.includes(item.id)}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
      </div>
      <div className="p-5 bg-transparent">
        <Button href="/onboard/end" disabled={selectedIds.length < 2}>
          선택완료
        </Button>
      </div>
    </div>
  );
}
