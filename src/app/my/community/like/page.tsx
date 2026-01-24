'use client';

import MyHeader from '@/components/my/MyHeader';
import ArticleList from '@/components/community/ArticleList';
import { MockArticles } from '@/mocks/mockArticles';

export default function MyFreeArticlePage() {
  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <MyHeader title={'좋아요한 게시물'} />
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        {/*
        <ArticleList articles={MockArticles} basePath={'/community/free'} variant={"free"}/>
        */}
      </main>
    </div>
  );
}
