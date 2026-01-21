'use client';

import { useMemo, useState } from 'react';

import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityTab from '@/components/community/CommunityTab';
import ArticleList from '@/components/community/ArticleList';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';
import { MockArticles } from '@/mocks/mockArticles';
import SideTab from '@/components/sideTabDir/SideTab';

export default function CommunityFreePage() {
  const headerOptions = useMemo(
    () => ['전체', '구매', '판매'],
    []
  );

  const [header, setHeader] = useState<string>('전체');

  const filteredArticles = useMemo(() => {
    if (header === '전체') return MockArticles;
    return MockArticles.filter((a) => a.boardHeader === header);
  }, [header]);

  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <CommunityHeader title={'디깅 라운지'} onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>

      <div className="shrink-0">
        <CommunityTab />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <CommunityHeaderFilter
          headers={headerOptions}
          value={header}
          onChangeAction={setHeader}
        />

        <ArticleList
          articles={filteredArticles}
          basePath="/community/trade"
          variant="trade"
        />
      </main>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
