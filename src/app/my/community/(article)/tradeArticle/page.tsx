"use client";

import { useEffect, useMemo, useState } from "react";

import MyHeader from "@/components/my/MyHeader";
import ArticleList from "@/components/community/ArticleList";
import BoardTab from "@/components/my/BoardTab";

import { GetMyMarketList } from "@/api/marketBoard";
import type { MyMarketItem } from "@/types/marketBoard";
import type { MarketArticle } from "@/types/marketBoard";

function toMarketArticles(items: MyMarketItem[]): MarketArticle[] {
  return items.map((x) => ({
    //매핑
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
        const res = await GetMyMarketList({ page: 0, size: 20 });
        setItems(res.payload);
      } catch (err) {
        console.error("MY 거래 게시물 조회 실패", err);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  const articles = useMemo(() => toMarketArticles(items), [items]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <MyHeader title={'MY 게시물'} backUrl="/my/community" />
      </header>

      <div className="shrink-0">
        <BoardTab />
      </div>

      {!isLoading && articles.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[#8C8888] text-sm">
          작성한 글이 없습니다
        </div>
      ) : (
        <ArticleList
          articles={articles}
          basePath="/community/trade"
          variant="trade"
        />
      )}
    </div>
  );
}
