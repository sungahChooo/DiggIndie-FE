'use client';

import ArticleHeader from '@/components/community/ArticleHeader';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
import DetailImgSection from '@/components/detail/DetailImgSection';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import linkIcon from '@/assets/community/link.svg';
import ProgressBar from '@/components/community/ProgressBar';
import { useParams, useRouter } from 'next/navigation';
import { boardDetailService } from '@/services/boardDetail.service';
import { TradeBoardDetail } from '@/types/board';
import { useAuthStore } from '@/stores/authStore';
import { deleteMarket, scrapMarket } from '@/api/marketBoard';
import TradeDetailSkeleton from '@/components/community/TradeDetailSkeleton';

export default function TradeArticleDetailPage() {
  const { isAuthed } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isScraped, setIsScrapped] = useState(false);

  const params = useParams();
  const boardId = Number(params.id);

  const [board, setBoard] = useState<TradeBoardDetail>();

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      const content = await boardDetailService.getTradeBoardDetail(boardId);
      setBoard(content);
      setIsLoading(false);
    };

    fetchDetail();
  }, [boardId]);

  //게시글 스크랩
  const handleToggleScrap = async () => {
    if (!board) return;

    const prev = {
      isScraped: board.isScraped,
      scrapCount: board.scrapCount,
    };

    // UI 즉시업데이트
    setBoard((prevBoard) =>
      prevBoard
        ? {
            ...prevBoard,
            isScraped: !prevBoard.isScraped,
            scrapCount: prevBoard.isScraped ? prevBoard.scrapCount - 1 : prevBoard.scrapCount + 1,
          }
        : prevBoard
    );

    try {
      const res = await scrapMarket({ marketId: board.marketId });

      if (!res.isSuccess) {
        throw new Error(res.message);
      }

      // 서버 기준 스크랩 수 불러오기
      setBoard((prevBoard) =>
        prevBoard
          ? {
              ...prevBoard,
              isScraped: res.payload.isScraped,
              scrapCount: res.payload.scrapCount,
            }
          : prevBoard
      );
    } catch {
      // 실패 시 이전 스크랩수
      setBoard((prevBoard) =>
        prevBoard
          ? {
              ...prevBoard,
              isScraped: prev.isScraped,
              scrapCount: prev.scrapCount,
            }
          : prevBoard
      );

      alert('스크랩 처리에 실패했습니다.');
    }
  };

  //key를 url로 가공
  const S3_BASE = 'https://diggindie-imgs.s3.ap-northeast-2.amazonaws.com';

  function toS3ImageUrl(raw?: string | null): string | null {
    if (!raw) return null;

    const v = raw.trim();
    if (!v) return null;

    // 이미 URL이면 그대로
    if (v.startsWith('http://') || v.startsWith('https://')) {
      return v;
    }

    // fileKey → URL
    return `${S3_BASE}/${encodeURIComponent(v)}`;
  }
  const handleEdit = () => {
    if (!boardId) return;
    router.push(`/community/write?mode=edit&board=trade&id=${boardId}`);
  };

  const handleDelete = async () => {
    if (!boardId) return;

    const res = await deleteMarket({ marketId: boardId });

    if (!res.isSuccess) {
      alert(res.message || '삭제에 실패했습니다.');
      return;
    }

    router.replace('/community/trade');
  };

  const imageCount = board?.images.length ?? 0;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    setCurrentIndex(Math.round(scrollLeft / width));
  };

  const getSafeUrl = (url?: string | null) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const safeChatUrl = getSafeUrl(board?.chatUrl);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <ArticleHeader
        title="거래/양도"
        isMine={board?.isMine}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {!isAuthed ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-base font-normal text-[#A6A6A6]">
            로그인 후 가능한 페이지입니다
          </span>
        </div>
      ) : isLoading ? (
        <TradeDetailSkeleton />
      ) : !board ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-gray-300 font-normal text-base">없는 게시글입니다</span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="relative">
            <section
              className="flex overflow-x-auto mb-3 snap-x snap-mandatory scrollbar-hide"
              onScroll={handleScroll}
            >
              {board.images.map((img, index) => {
                const imageSrc = toS3ImageUrl(img.imageUrl);

                return (
                  <div key={index} className="w-full flex-shrink-0 snap-center">
                    <DetailImgSection imageSrc={imageSrc} alt={img.imageUrl} />
                  </div>
                );
              })}
            </section>
          </div>

          <div className="px-5">
            <ProgressBar imageCount={imageCount} currentIndex={currentIndex} />
          </div>

          <section className="px-5">
            <p className="bg-gray-900 border border-gray-850 rounded-sm px-2 py-3 mb-7 flex gap-1">
              <Image src={linkIcon} height={24} width={24} alt="링크아이콘" />
              {safeChatUrl ? (
                <a
                  href={safeChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-200 break-all"
                >
                  {board.chatUrl}
                </a>
              ) : (
                <span className="text-sm text-gray-600 cursor-not-allowed">링크가 없습니다</span>
              )}
            </p>

            <div className="flex w-full items-center gap-6 mb-1 justify-between">
              <div className="flex items-center gap-1 w-full h-7 min-w-0">
                <span className="shrink-0 font-semibold text-xl">[{board.type}]</span>
                <span className="min-w-0 flex-1 font-semibold text-xl truncate">{board.title}</span>
                <span className="shrink-0 flex items-center gap-[3px]">
                  <BookmarkIcon
                    isActive={board.isScraped}
                    isMine={board.isMine}
                    onClick={!board.isMine ? handleToggleScrap : undefined}
                    className={`w-6 h-6 transition-colors ${
                      board.isScraped ? 'text-white scale-110' : 'text-gray-600'
                    } ${board.isMine ? '' : 'cursor-pointer'}`}
                  />
                  <span className="text-gray-300 font-normal text-sm">{board.scrapCount}</span>
                </span>
              </div>
            </div>

            <span className="text-white font-medium text-xl mb-1">{board.price}원</span>

            <p className="flex gap-[7px] mb-3">
              <span className="text-gray-600 font-medium text-xs">{board.nickname}</span>
              <span className="text-gray-600 font-medium text-xs">{board.timeAgo}</span>
            </p>

            <p className="text-gray-300 font-normal text-sm mb-20 break-words whitespace-pre-wrap">
              {board.content}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
