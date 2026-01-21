'use client';

import { useEffect, useRef, useState } from 'react';
import type { MockIndieStory } from '@/types/mocks/mockIndieStory';
import IndieStoryCard from './IndieStoryCard';
import downBtn from '@/assets/icons/down.svg';
import Image from 'next/image';

type SortKey = '업데이트순' | '조회순';

type Props = {
  indieStories: MockIndieStory[];
  sortKey: SortKey;
  onSortChangeAction: (k: SortKey) => void;
};

export default function IndieStoryList({ indieStories, sortKey, onSortChangeAction }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const leftColumn = indieStories.filter((_, i) => i % 2 === 0);
  const rightColumn = indieStories.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex flex-col">
      {/* 드롭다운 */}
      <div ref={ref} className="relative ml-[20px] mb-[16px] z-30">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="border border-[#736F6F] rounded-[4px] w-[100px] h-[28px] px-1 py-1
            text-[14px] flex items-center gap-1 bg-black justify-center"
        >
          {sortKey}
          <Image src={downBtn} alt="open" width={16} height={16} />
        </button>

        {open && (
          <div
            className="absolute mt-2 border w-[100px] border-[#736F6F]
              bg-black text-[14px] font-normal leading-[140%] tracking-[-0.03em]
              py-2 rounded-[4px]"
          >
            {(['업데이트순', '조회순'] as SortKey[]).map((key) => (
              <div
                key={key}
                className={`w-[84px] h-[28px] py-1 cursor-pointer ml-[8px] px-2
                  ${key === sortKey ? 'bg-[#332F2F] rounded-[4px] text-white' : 'text-[#8C8888]'}
                `}
                onClick={() => {
                  onSortChangeAction(key);
                  setOpen(false);
                }}
              >
                {key}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2 컬럼 */}
      <div className="flex gap-[15px] px-[20px]">
        <div className="flex flex-col gap-[16px] w-[160px]">
          {leftColumn.map((story) => (
            <IndieStoryCard key={story.id} indieStory={story} />
          ))}
        </div>

        <div className="flex flex-col gap-[16px] w-[160px]">
          {rightColumn.map((story) => (
            <IndieStoryCard key={story.id} indieStory={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
