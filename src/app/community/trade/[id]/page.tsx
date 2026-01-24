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

export default function TradeArticleDetailPage() {
  const { isAuthed } = useAuthStore();
  const router = useRouter();

  const [isScraped, setIsScrapped] = useState(false);

  const params = useParams();
  const boardId = Number(params.id);

  const [board, setBoard] = useState<TradeBoardDetail>();

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      const content = await boardDetailService.getTradeBoardDetail(boardId);
      setBoard(content);
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
          scrapCount: prevBoard.isScraped
            ? prevBoard.scrapCount - 1
            : prevBoard.scrapCount + 1,
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
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 left-1/2 -translate-x-1/2 pb-20">
      <ArticleHeader
        title="거래/양도"
        isMine={board?.isMine}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {!isAuthed ? (
        <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-56px)]">
          <span className="text-base font-normal text-[#A6A6A6]">
            로그인 후 가능한 페이지입니다
          </span>
        </div>
      ) : !board ? (
        <div className="h-screen flex items-center justify-center">
          <span className="text-gray-300 font-normal text-base">없는 게시글입니다</span>
        </div>
      ) : (
        <>
          <div className="relative">
            <section
              className="flex overflow-x-auto mb-3 snap-x snap-mandatory scrollbar-hide "
              onScroll={handleScroll}
            >
              {board.images.map((url, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-center">
                  <DetailImgSection imageSrc={url.imageUrl} alt={url.imageUrl} />
                </div>
              ))}
            </section>
          </div>

          <div className="px-5">
            <ProgressBar imageCount={imageCount} currentIndex={currentIndex} />
          </div>

          <section className="px-5">
            <p className="bg-gray-900 border border-gray-850 rounded-sm px-[10px] px-2 py-3 mb-7 flex gap-1">
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

            <div className="flex items-center gap-6 mb-1 justify-between">
              <div className={"flex gap-1"}>
                <span className="font-semibold text-xl">[{board.type}]</span>
                <span className="font-semibold text-xl">{board.title}</span>
              </div>
              <span className="flex gap-[3px]">
                <BookmarkIcon
                  isActive={board.isScraped}
                  onClick={!board.isMine ? handleToggleScrap : undefined}
                  className={`cursor-pointer w-6 h-6 transition-colors 
            ${(board.isScraped )? 'text-white scale-110' : 'text-gray-600'}
          `}
                />
                <span className="text-gray-300 font-normal text-sm">{board.scrapCount}</span>
              </span>
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
        </>
      )}
    </div>
  );
}
