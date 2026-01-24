'use client';
import LinkButton from '@/components/common/LinkButton';
import GenreItem from '@/components/onBoard/GenreItem';
import Header from '@/components/onBoard/Header';
import ProgressBar from '@/components/onBoard/ProgressBar';
import TitleSection from '@/components/onBoard/TitleSection';
import { onBoardKeywordService } from '@/services/onBoardKeyword.service';
import { Keyword } from '@/types/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OnBoardGenrePage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 키워드 조회
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await onBoardKeywordService.getKeywords();
        setKeywords(data);
        const selected = await onBoardKeywordService.getSeletedKeywords();
        setSelectedIds(selected.map((item) => item.keywordId));
      } catch (err) {
        console.error(err);
      }
    };

    fetchKeywords();
  }, []);

  /*장르 선택 함수  */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  const handleComplete = async () => {
    if (selectedIds.length < 2) return;

    await onBoardKeywordService.saveSelectedKeywords(selectedIds);
    router.push('/onboard/end');
  };

  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header href="/onboard/artist" />
      <div className="flex-1 overflow-auto gap-5 flex flex-col pb-10">
        <div className="px-5">
          <ProgressBar current={2} total={3} />
        </div>
        <TitleSection
          title={
            <>
              좋아하는 장르나
              <br /> 키워드를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <div className="flex flex-wrap gap-4 px-5">
          {keywords.map((item) => (
            <GenreItem
              key={item.keywordId}
              genre={{ id: item.keywordId, name: item.keyword }}
              isSelected={selectedIds.includes(item.keywordId)}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
      </div>
      <div className="px-5 pb-5">
        <LinkButton
          href={'/onboard/end'}
          disabled={selectedIds.length < 2}
          onClick={handleComplete}
        >
          선택완료
        </LinkButton>
      </div>
    </div>
  );
}
