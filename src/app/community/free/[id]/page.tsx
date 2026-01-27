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
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 pb-20">
      <ArticleHeader
        title="자유 라운지"
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
      ) : isLoading ? (
        <FreeDetailSkeleton />
      ) : !board ? (
        <div className="h-screen flex items-center justify-center">
          <span className="text-gray-300 font-normal text-base">없는 게시글입니다</span>
        </div>
      ) : (
        <>
          {/* 스크롤 영역 */}
          <div className="flex-1 overflow-y-auto pb-20">
            <ArticleBody content={board} onToggleLike={handleToggleLike} />

            <CommentCard
              comments={board.comments}
              onToggleLike={(commentId) => {
                if (isCommentLiking) return;
                toggleCommentLike(commentId);
              }}
              onReplyClick={(parentCommentId, nickname, depth) =>
                setReplyTarget({ parentCommentId, nickname, depth })
              }
            />
          </div>

          <div className="flex justify-center">
            <ReplyInputSection
              addReply={addReply}
              disabled={isCommentSubmitting}
              replyTarget={replyTarget}
              onCancelReply={() => setReplyTarget(null)}
            />
          </div>
        </>
      )}
    </div>
  );
}
