'use client';

import Image from 'next/image';
import commentsIcon from '@/assets/sideTab/Chat 2.svg';
import HeartIcon from '@/assets/community/HeartIcon';
import { useState } from "react";
import { FreeBoardDetail } from '@/types/board';

interface ArticleBodyProps {
  content: FreeBoardDetail;
  onToggleLike: () => void;
}

//S3로부터 오는 fileKey를 절대경로 URL로 가공
const S3_BASE = "https://diggindie-imgs.s3.ap-northeast-2.amazonaws.com";

function normalizeBoardImageSrc(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  if (!v) return null;
  // 이미 절대 URL이면 그대로 사용
  if (v.startsWith("http://") || v.startsWith("https://")) {
    try {
      new URL(v);
      return v;
    } catch {
      return null;
    }
  }
  // S3 문자열로
  const src = `${S3_BASE}/${encodeURIComponent(v)}`;

  try {
    new URL(src);
    return src;
  } catch {
    return null;
  }
}

//이미지 실패 대비
function SingleImage({ src }: { src: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="w-[200px] h-[200px] relative mb-3">
      <Image
        src={imgSrc}
        alt="article-image-1"
        fill
        className="object-cover"
        onError={() => setImgSrc("/mocks/concertDefault.png")}
      />
    </div>
  );
}


export default function ArticleBody({ content, onToggleLike }: ArticleBodyProps) {

  const imageSrcs = (content.imageUrls ?? [])
    .map(normalizeBoardImageSrc)
    .filter((v): v is string => Boolean(v));

  return (
    <div className="flex flex-col w-full py-4 px-5 border-b-4 border-gray-850">
      <span className="font-semibold text-xl text-white mb-1 break-words line-clamp-2">
        {content.category && `[${content.category}] `}
        {content.title}
      </span>

      <p className="flex gap-2 mb-2">
        <span className="text-gray-600 font-medium text-xs">{content.writerNickname}</span>
        <span className="text-gray-600 font-medium text-xs">{content.createdAt}</span>
        <span className="text-gray-600 font-medium text-xs">조회수 {content.views}</span>
      </p>

      <div className="text-sm text-gray-300 font-normal mb-5 min-h-12 break-words whitespace-pre-wrap">
        {content.content}
      </div>

      {/* 이미지 */}
      {imageSrcs.length === 1 && <SingleImage src={imageSrcs[0]} />}

      {imageSrcs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto mb-3">
          {imageSrcs.map((src, idx) => (
            <div key={`${src}-${idx}`} className="w-[200px] h-[200px] flex-shrink-0 relative">
              <Image src={src} alt={`article-image-${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* 좋아요 / 댓글 */}
      <div className="flex gap-3 text-sm font-normal">
        <p className="flex gap-[3px] items-center">
          <HeartIcon
            size={24}
            active={content.isLiked}
            onClick={onToggleLike}
            firstStroke={content.isMine ? '#736F6F' : 'white'}
          />
          <span className="text-white">{content.likeCount}</span>
        </p>

        <p className="flex gap-[3px] items-center">
          <Image src={commentsIcon} alt="comment" width={24} height={24} />
          <span className="text-white">{content.commentCount}</span>
        </p>
      </div>
    </div>
  );
}
