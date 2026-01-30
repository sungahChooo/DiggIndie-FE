'use client';

import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { useEffect, useState } from 'react';
import { boardDetailService } from '@/services/boardDetail.service';
import type { FreeBoardDetail } from '@/types/board';
import { useAuthStore } from '@/stores/authStore';
import { useParams, useRouter } from 'next/navigation';
import { deleteFree, likeFree } from '@/api/freeBoard';
import { useCommentFree } from '@/hooks/useCommentFree';
import FreeDetailSkeleton from '@/components/community/FreeDetailSkeleton';


export default function FreeArticleDetailPage() {
  const { isAuthed } = useAuthStore();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const boardId = Number(params.id);
  const [board, setBoard] = useState<FreeBoardDetail | null>(null);


  //스켈레톤 로딩 이후 높이 계산 문제로 스크롤 안되는 버그 해결
  useEffect(() => {
    if (!isLoading) {
      // 1. body와 html의 overflow 설정을 명시적으로 초기화
      // 스크롤바를 숨겨놨기 때문에 브라우저가 간혹 스크롤 가능 상태를 놓칩니다.
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';

      // 2. 브라우저가 레이아웃을 재계산하도록 아주 미세하게 스크롤 이동
      // 0에서 1px만 움직여도 브라우저는 스크롤 가능 여부를 다시 체크합니다.
      window.scrollTo(0, 1);
      window.scrollTo(0, 0);
    }
  }, [isLoading]);
  const [replyTarget, setReplyTarget] = useState<{
    parentCommentId: number;
    nickname: string;
    depth: 0 | 1;
  } | null>(null);

  const {
    submitComment,
    toggleCommentLike,
    isSubmitting: isCommentSubmitting,
    isLiking: isCommentLiking,
  } = useCommentFree({
    boardId,
    setBoard,
  });

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      const content = await boardDetailService.getFreeBoardDetail(boardId);
      setBoard(content);
      setIsLoading(false);
    };

    fetchDetail();
  }, [boardId]);

  const handleEdit = () => {
    if (!boardId) return;
    router.push(`/community/write?mode=edit&board=free&id=${boardId}`);
  };

  const handleDelete = async () => {
    if (!boardId) return;

    const res = await deleteFree({ boardId });

    if (!res.isSuccess) {
      alert(res.message || '삭제에 실패했습니다.');
      return;
    }

    router.replace('/community/free');
  };

  const handleToggleLike = async () => {
    if (!board || board.isMine) return;

    const prev = {
      isLiked: board.isLiked,
      likeCount: board.likeCount,
    };

    setBoard((prevBoard) =>
      prevBoard
        ? {
            ...prevBoard,
            isLiked: !prevBoard.isLiked,
            likeCount: prevBoard.isLiked ? prevBoard.likeCount - 1 : prevBoard.likeCount + 1,
          }
        : prevBoard
    );

    try {
      const res = await likeFree({ boardId });

      if (!res.isSuccess) {
        alert(res.message || '좋아요 처리에 실패했습니다.');
        setBoard((prevBoard) =>
          prevBoard ? { ...prevBoard, isLiked: prev.isLiked, likeCount: prev.likeCount } : prevBoard
        );
        return;
      }

      setBoard((prevBoard) =>
        prevBoard
          ? {
              ...prevBoard,
              isLiked: res.payload.isLiked,
              likeCount: res.payload.likeCount,
            }
          : prevBoard
      );
    } catch {
      setBoard((prevBoard) =>
        prevBoard ? { ...prevBoard, isLiked: prev.isLiked, likeCount: prev.likeCount } : prevBoard
      );
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  const addReply = (content: string, isAnonymous: boolean) => {
    submitComment({
      content,
      isAnonymous,
      parentCommentId: replyTarget?.parentCommentId ?? null,
    });

    setReplyTarget(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* 1. 상단 헤더: sticky가 있으므로 이 자리에 가만히 고정됩니다. */}
      <ArticleHeader
        title="자유 라운지"
        isMine={board?.isMine}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* 2. 본문 영역: 헤더 아래부터 댓글창 위까지 스크롤되는 구간 */}
      <main className="flex-1 overflow-y-auto">
        {!isAuthed ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            <span className="text-[#A6A6A6]">로그인 후 가능한 페이지입니다</span>
          </div>
        ) : isLoading ? (
          <FreeDetailSkeleton />
        ) : !board ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            <span className="text-gray-300">없는 게시글입니다</span>
          </div>
        ) : (
          <div className="pb-32">
            {' '}
            {/* 하단 입력창에 가려지지 않게 여백 추가 */}
            <ArticleBody content={board} onToggleLike={handleToggleLike} />
            <CommentCard
              comments={board.comments}
              onToggleLike={toggleCommentLike}
              onReplyClick={(id, nick, d) =>
                setReplyTarget({ parentCommentId: id, nickname: nick, depth: d })
              }
            />
          </div>
        )}
      </main>
      {/* 3. 하단 입력창: fixed 속성이므로 화면 맨 아래에 붙어 있습니다. */}

      <div className={'flex justify-center'}>
        {isAuthed &&
        <ReplyInputSection
          addReply={addReply}
          disabled={isCommentSubmitting}
          replyTarget={replyTarget}
          onCancelReply={() => setReplyTarget(null)}
        />}
      </div>
    </div>
  );
}
