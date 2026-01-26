'use client';

import Image from 'next/image';
import HeartIcon from '@/assets/community/HeartIcon';
import reply_arrow from '@/assets/community/Arrow Bottom Left 3.svg';
import type { Comment } from '@/types/board';

type Props = {
  comments: Comment[];
  onToggleLike?: (commentId: number) => void;
  onReplyClick?: (parentCommentId: number, nickname: string, depth: 0 | 1) => void;
};

function splitMention(content: string) {
  const text = content ?? '';
  if (!text.startsWith('@')) return { mention: null as string | null, rest: text };

  const spaceIndex = text.indexOf(' ');
  if (spaceIndex === -1) return { mention: text, rest: '' };

  return {
    mention: text.slice(0, spaceIndex + 1),
    rest: text.slice(spaceIndex + 1),
  };
}

function MentionText({ text, className }: { text: string; className: string }) {
  const { mention, rest } = splitMention(text);

  return (
    <p className={className}>
      {mention && <span className="text-[#FF6A46]">{mention}</span>}
      <span className="text-gray-300">{rest || ' '}</span>
    </p>
  );
}

export default function CommentCard({ comments, onToggleLike, onReplyClick }: Props) {
  if (!comments || comments.length === 0) {
    return <div className="py-10 text-center text-gray-600 text-sm">댓글이 없습니다.</div>;
  }

  return (
    <div className="w-full mt-2">
      {comments.map((comment) => {
        const depth1Replies = comment.replies.filter((r) => r.depth === 1);
        const depth2Replies = comment.replies.filter((r) => r.depth === 2);

        return (
          <div key={comment.commentId}>
            {/* 부모 댓글 */}
            <div className="px-5 py-4 border-b-1 border-gray-900">
              <p className="flex gap-2 mb-1 items-end">
                <span className="text-base font-medium text-white">{comment.writerNickname}</span>
                <span className="text-xs text-gray-600 font-medium">{comment.createdAt}</span>
              </p>

              <MentionText text={comment.content} className="text-sm font-normal" />

              <div className="flex items-center mt-2">
                <span
                  className="text-gray-600 text-sm font-medium pr-3 border-r border-gray-800 cursor-pointer"
                  onClick={() => onReplyClick?.(comment.commentId, comment.writerNickname, 0)}
                >
                  답글 달기
                </span>

                <p className={`flex gap-1 pl-3 items-center ${
                  comment.isMine ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                }`}
                >
                  <HeartIcon
                    size={16}
                    active={comment.isLiked}
                    firstStroke={comment.isMine ? '#736F6F' : undefined}
                    onClick={() => {
                      if (comment.isMine) return;
                      onToggleLike?.(comment.commentId);
                    }}
                  />

                  <span className="text-sm font-normal text-gray-600">{comment.likeCount}</span>
                </p>
              </div>
            </div>

            {/* 대댓글 (depth 1) */}
            {depth1Replies.map((reply) => (
              <div key={reply.commentId}>
                <div className="flex gap-2 py-4 items-start border-b-1 border-gray-900 px-5">
                  <Image src={reply_arrow} alt="reply arrow" />

                  <div className="flex flex-col w-full">
                    <p className="flex gap-2 mb-1 items-end">
                      <span className="text-base font-medium text-white">{reply.writerNickname}</span>
                      <span className="text-xs text-gray-600 font-medium">{reply.createdAt}</span>
                    </p>

                    {/* 대댓글은 멘션 하이라이트 제거 */}
                    <p className="text-xs font-normal text-gray-300">{reply.content}</p>

                    <div className="flex items-center mt-2">
                      <span
                        className="text-gray-600 text-sm pr-3 border-r border-gray-800 cursor-pointer"
                        onClick={() => onReplyClick?.(reply.commentId, reply.writerNickname, 1)}
                      >
                        답글 달기
                      </span>

                      <p className={`flex gap-1 pl-3 items-center ${
                        reply.isMine ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                      }`}
                      >
                        <HeartIcon
                          size={14}
                          active={reply.isLiked}
                          firstStroke={reply.isMine ? '#736F6F' : undefined}
                          onClick={() => {
                            if (reply.isMine) return;
                            onToggleLike?.(reply.commentId);
                          }}
                        />

                        <span className="text-sm text-gray-600">{reply.likeCount}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 대대댓글 (depth 2) */}
                {depth2Replies
                  .filter((r) => r.parentCommentId === reply.commentId)
                  .map((child) => (
                    <div key={child.commentId} className="pl-13 py-4 border-b-1 border-gray-900 px-5">
                      <div className="flex gap-2 items-start">
                        <Image src={reply_arrow} alt="reply arrow" />

                        <div className="flex flex-col w-full">
                          <p className="flex gap-2 items-end mb-1">
                            <span className="text-base font-medium text-white">{child.writerNickname}</span>
                            <span className="text-xs text-gray-600 font-medium">{child.createdAt}</span>
                          </p>

                          <p className="text-sm font-normal">
                            <span className="text-[#FF6A46] text-xs font-normal">
                              @{child.replyToNickname}{' '}
                            </span>
                            {(() => {
                              const { rest } = splitMention(child.content);
                              return <span className="text-gray-300">{rest || ' '}</span>;
                            })()}
                          </p>

                          <div
                            className={`flex items-center mt-2 ${
                              child.isMine ? 'cursor-default pointer-events-none' : 'cursor-pointer'
                            }`}
                          >
                            <HeartIcon
                              size={14}
                              active={child.isLiked}
                              firstStroke={child.isMine ? '#736F6F' : undefined}
                              onClick={() => {
                                if (child.isMine) return;
                                onToggleLike?.(child.commentId);
                              }}
                            />

                            <span className="text-sm text-gray-600 ml-1">{child.likeCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
