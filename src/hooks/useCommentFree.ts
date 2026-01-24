'use client';

import { useCallback, useState } from 'react';
import { commentFree, likeCommentFree } from '@/api/freeBoard';
import { boardDetailService } from '@/services/boardDetail.service';
import type { FreeBoardDetail, Comment } from '@/types/board';

type Params = {
  boardId: number;
  setBoard: React.Dispatch<React.SetStateAction<FreeBoardDetail | null>>;
};

export type SubmitFreeCommentArgs = {
  content: string;
  isAnonymous: boolean;
  parentCommentId?: number | null;
};

type LikeSnapshot = {
  isLiked: boolean;
  likeCount: number;
};

function findCommentSnapshot(comments: Comment[], commentId: number): LikeSnapshot | null {
  for (const c of comments) {
    if (c.commentId === commentId) return { isLiked: c.isLiked, likeCount: c.likeCount };
    
    if (c.replies && c.replies.length > 0) {
      for (const r of c.replies) {
        if (r.commentId === commentId) return { isLiked: r.isLiked, likeCount: r.likeCount };
      }
    }
  }
  return null;
}

function patchCommentLike(
  comments: Comment[],
  commentId: number,
  next: { isLiked: boolean; likeCount: number }
): Comment[] {
  return comments.map((c) => {
    if (c.commentId === commentId) {
      return { ...c, isLiked: next.isLiked, likeCount: next.likeCount };
    }

    if (c.replies && c.replies.length > 0) {
      const nextReplies = c.replies.map((r) => {
        if (r.commentId !== commentId) return r;
        return { ...r, isLiked: next.isLiked, likeCount: next.likeCount };
      });

      // 재 렌더 줄이기 위해 비교
      return { ...c, replies: nextReplies };
    }

    return c;
  });
}

export function useCommentFree({ boardId, setBoard }: Params) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitComment = useCallback(
    async ({ content, isAnonymous, parentCommentId = null }: SubmitFreeCommentArgs) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      setIsSubmitting(true);
      setError(null);

      try {
        const res = await commentFree({
          boardId,
          content: trimmed,
          isAnonymous,
          parentCommentId,
        });

        if (!res.isSuccess) {
          setError(res.message || '댓글 작성에 실패했습니다.');
          return;
        }

        const fresh = await boardDetailService.getFreeBoardDetail(boardId);
        setBoard(fresh);
      } catch {
        setError('댓글 작성에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [boardId, setBoard]
  );

  const toggleCommentLike = useCallback(
    async (commentId: number) => {
      if (!commentId) return;

      let snapshot: LikeSnapshot | null = null;

      setBoard((prev) => {
        if (!prev) return prev;

        snapshot = findCommentSnapshot(prev.comments, commentId);
        if (!snapshot) return prev;

        const nextIsLiked = !snapshot.isLiked;
        const nextLikeCount = snapshot.isLiked ? snapshot.likeCount - 1 : snapshot.likeCount + 1;

        return {
          ...prev,
          comments: patchCommentLike(prev.comments, commentId, {
            isLiked: nextIsLiked,
            likeCount: nextLikeCount,
          }),
        };
      });

      setIsLiking(true);
      setError(null);

      try {
        const res = await likeCommentFree({ commentId });

        if (!res.isSuccess) {
          //본인 댓글 좋아요 방지
          if (res.statusCode === 400) {
            alert('자신의 댓글에는 좋아요를 누를 수 없습니다.');
          } else {
            alert(res.message || '댓글 좋아요에 실패했습니다.');
          }

          if (snapshot) {
            setBoard((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                comments: patchCommentLike(prev.comments, commentId, snapshot!),
              };
            });
          }
          return;
        }

        setBoard((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            comments: patchCommentLike(prev.comments, commentId, {
              isLiked: res.payload.isLiked,
              likeCount: res.payload.likeCount,
            }),
          };
        });
      } catch {
        if (snapshot) {
          setBoard((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              comments: patchCommentLike(prev.comments, commentId, snapshot!),
            };
          });
        }
        alert('댓글 좋아요 처리에 실패했습니다.');
      } finally {
        setIsLiking(false);
      }
    },
    [setBoard]
  );

  return {
    submitComment,
    toggleCommentLike,
    isSubmitting,
    isLiking,
    error,
  };
}
