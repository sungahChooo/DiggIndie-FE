'use client';

import Image from 'next/image';
import commentsIcon from '@/assets/sideTab/Chat 2.svg';
import HeartIcon from '@/assets/community/HeartIcon';
import { FreeBoardDetail } from '@/types/board';

interface ArticleBodyProps {
  content: FreeBoardDetail;
  onToggleLike: () => void;
}

export default function ArticleBody({ content, onToggleLike }: ArticleBodyProps) {
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
      {content.imageUrls?.length === 1 && (
        <div className="w-full aspect-square relative mb-3">
          <Image
            src={content.imageUrls[0]}
            alt="article-image"
            fill
            className="object-cover rounded-sm"
          />
        </div>
      )}

      {content.imageUrls && content.imageUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-scroll mb-3">
          {content.imageUrls.map((src, idx) => (
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
