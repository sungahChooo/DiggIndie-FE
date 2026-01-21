'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
import DetailImgSection from '@/components/detail/DetailImgSection';
import tradeDetailData from '@/mocks/community/tradeDetail.json';
import Image from 'next/image';
import { useState } from 'react';
import linkIcon from '@/assets/community/link.svg';

export default function TradeArticleDetailPage() {
  const [isScrapped, setIsScrapped] = useState(false);

  const handleToggleScrap = () => {
    setIsScrapped((prev) => !prev);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = tradeDetailData.imageUrls.length;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    setCurrentIndex(Math.round(scrollLeft / width));
  };
  return (
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 left-1/2 -translate-x-1/2 pb-20">
      <div className="relative">
        <ArticleHeader title="거래/양도" />
        <section
          className="flex overflow-x-auto mb-3 snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
        >
          {tradeDetailData.imageUrls.map((url, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-center">
              <DetailImgSection key={index} imageSrc={url} alt={tradeDetailData.marketTitle} />
            </div>
          ))}
        </section>
        <div className="w-full h-1 bg-gray-700 rounded-full my-3 flex overflow-hidden">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      <section className="px-5">
        <p className="bg-gray-900 border border-gray-850 rounded-sm px-[10px] px-2 py-3 mb-7 flex gap-1">
          <Image src={linkIcon} height={24} width={24} alt="링크아이콘" />
          채팅 링크
        </p>
        <p className="flex items-center gap-6 mb-1 justify-between">
          <span className="font-semibold text-xl">{tradeDetailData.marketTitle}</span>
          <span className="flex gap-[3px]">
            <BookmarkIcon
              isActive={isScrapped}
              onClick={handleToggleScrap}
              className={`cursor-pointer w-6 h-6 transition-colors 
            ${isScrapped ? 'text-white scale-110' : 'text-gray-600'}
          `}
            />
            <span className="text-gray-300 font-normal text-sm">{tradeDetailData.scrapCount}</span>
          </span>
        </p>
        <span className="text-white font-medium text-xl mb-1">{tradeDetailData.price}원</span>
        <p className="flex gap-[7px] mb-3">
          <span className="text-gray-600 font-medium text-xs">
            {tradeDetailData.member.nickname}
          </span>
          <span className="text-gray-600 font-medium text-xs">{tradeDetailData.createdAt}</span>
        </p>
        <p className="text-gray-300 font-normal text-sm mb-20">{tradeDetailData.marketContent}</p>
      </section>
    </div>
  );
}
