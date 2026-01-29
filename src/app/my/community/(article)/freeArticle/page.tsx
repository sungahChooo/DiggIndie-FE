'use client';

import { useEffect, useState } from 'react';

import MyHeader from '@/components/my/MyHeader';
import ArticleList from '@/components/community/ArticleList';
import BoardTab from '@/components/my/BoardTab';

import { getMyFreeList } from '@/api/freeBoard';
import type { MyFreeItem } from '@/types/freeBoard';

export default function MyFreeArticlePage() {
  const [articles, setArticles] = useState<MyFreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getMyFreeList({ page: 0, size: 20 });
        setArticles(res.payload);
      } catch (err) {
        console.error('내 게시물 조회 실패', err);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <MyHeader title={'MY 게시물'} backUrl="/my/community" />
      </header>

      <div className="shrink-0">
        <BoardTab />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
          <ArticleList articles={articles} basePath={'/community/free'} variant={'free'} />
      </main>
    </div>
  );
}
