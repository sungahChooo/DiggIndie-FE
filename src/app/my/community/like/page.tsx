'use client';

import { useEffect, useState } from 'react';

import MyHeader from '@/components/my/MyHeader';
import ArticleList from '@/components/community/ArticleList';

import { GetMyFreeLiked } from '@/api/freeBoard';
import type { MyFreeItem } from '@/types/freeBoard';

export default function MyFreeArticlePage() {
  const [articles, setArticles] = useState<MyFreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await GetMyFreeLiked({ page: 0, size: 10 });
        setArticles(res.payload);
      } catch (err) {
        console.error('좋아요한 자유게시판 조회 실패', err);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 mb-3 h-[52px] bg-black flex items-center shrink-0">
        <MyHeader title={'좋아요한 게시물'} />
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
          <ArticleList articles={articles} basePath={'/community/free'} variant={'free'} />
      </main>
    </div>
  );
}
