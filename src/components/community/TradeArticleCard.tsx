'use client';

import Image from 'next/image';
import type { MarketArticle } from '@/types/marketBoard';
import concertDefault from '@/assets/common/concertDefault.png';

type Props = {
  article: MarketArticle;
};

// 디테일 페이지와 동일한 S3 BASE로 맞춤
const S3_BASE =
  process.env.NEXT_PUBLIC_MARKET_IMAGE_BASE_URL ||
  'https://diggindie-imgs.s3.ap-northeast-2.amazonaws.com';

function toS3ImageUrl(raw?: string | null): string | null {
  if (!raw) return null;

  const v = raw.trim();
  if (!v) return null;

  // 이미 절대 URL이면 그대로
  if (v.startsWith('http://') || v.startsWith('https://')) return v;

  return `${S3_BASE}/${encodeURIComponent(v)}`;
}

export default function MarketArticleCard({ article }: Props) {
  const resolved = toS3ImageUrl(article.thumbnailUrl);
  const src = resolved ?? concertDefault;

  return (
    <div className="w-full mr-auto h-[116px] flex items-center border-b-[1px] border-[#332F2F] py-4 px-5 gap-[18px]">
      <div className="relative w-[84px] h-[84px] overflow-hidden">
        <Image
          src={src}
          alt="image"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-col min-w-0 flex-1 font-medium justify-between ">
        <div className="flex h-[22px] text-white text-[16px] min-w-0">
          <span className="shrink-0 mr-[2px]">[{article.type}]</span>
          <span className="truncate min-w-0">{article.title}</span>
        </div>

        <span className="mt-[4px]">{article.price}원</span>

        <div className="flex h-[17px] text-[#8C8888] text-[12px] mt-[19px]">
          {article.timeAgo}
        </div>
      </div>
    </div>
  );
}
