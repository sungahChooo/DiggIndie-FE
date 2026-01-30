'use client';

import { useEffect, useMemo, useState } from 'react';

import MyHeader from '@/components/my/MyHeader';
import ArticleList from '@/components/community/ArticleList';

import { GetMyMarketScraps } from '@/api/marketBoard';
import type { MarketArticle, MyMarketItem } from '@/types/marketBoard';

function toTradeArticles(items: MyMarketItem[]): MarketArticle[] {
  //매핑
  return items.map((x) => ({
    marketId: x.marketId,
    title: x.title,
    price: x.price,
    thumbnailUrl: x.thumbnailUrl,
    timeAgo: x.createdAt,
    type: x.category,
  })) as unknown as MarketArticle[];
}

export default function MyTradeArticlePage() {
  const [items, setItems] = useState<MyMarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await GetMyMarketScraps({ page: 0, size: 10 });
        setItems(res.payload);
      } catch (err) {
        console.error('스크랩한 거래/양도글 조회 실패', err);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  const articles = useMemo(() => toTradeArticles(items), [items]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] mb-3 bg-black flex items-center shrink-0">
        <MyHeader title={'스크랩한 거래/양도글'} />
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">

        {!isLoading && articles.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-[#8C8888] text-sm">
            스크랩한 글이 없습니다
          </div>
        ) : (
          <ArticleList
            articles={articles}
            basePath="/community/trade"
            variant="trade"
          />
        )}

      </main>
    </div>
  );
}
