'use client';
import HeartIcon from '@/assets/community/HeartIcon';
import { useState } from 'react';

interface Comment {
  commentId: number;
  content: string;
  hasParent: boolean;
  parentId: number | null;
  member: {
    memberId: number;
    nickname: string;
  };
}

export default function CommentCard({ comments }: { comments: Comment[] }) {
  const [isLiked, setIsLiked] = useState(false);
  const parents = comments.filter((c) => !c.hasParent);
  const replies = comments.filter((c) => c.hasParent);

  return (
    <div className="w-full mt-2">
      {parents.map((comment) => (
        <div key={comment.commentId} className="px-5 py-4">
          <p className="flex gap-[9px] mb-2">
            <span className="text-base font-medium">{comment.member.nickname}</span>
            <span className="text-gray-600 text-sm self-end">12분전</span>
          </p>

          <div className="text-sm text-gray-300 font-normal">{comment.content}</div>

          {replies
            .filter((r) => r.parentId === comment.commentId)
            .map((reply) => (
              <div key={reply.commentId} className="ml-10 mt-2 text-gray-400">
                ↳ {reply.member.nickname}: {reply.content}
              </div>
            ))}

          <div className="flex items-center mt-2">
            <span className="text-gray-600 text-sm font-medium pr-3 border-r-1 border-gray-800">
              답글 달기
            </span>
            <p className="flex gap-[3px] pl-3 items-center">
              <HeartIcon size={16} active={isLiked} onClick={() => setIsLiked(!isLiked)} />
              <span className="text-sm text-gray-600 font-normal">0</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
