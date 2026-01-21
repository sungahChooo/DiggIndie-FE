'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/freeDetailDummy.json';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { useState } from 'react';

interface Comment {
  commentId: number;
  member: {
    memberId: number;
    nickname: string;
  };
  content: string;
  isLiked: boolean;
  likeCount: number;
  hasParent: boolean;
  parentId: number | null;
}
type Props = {
  params: { id: string };
};

export default function FreeArticleDetailPage({ params }: Props) {
  const [comments, setComments] = useState(freeDetailData.comments);

  const addReply = (content: string) => {
    setComments((prev) => [
      ...prev,
      {
        commentId: Date.now(),
        member: {
          memberId: -1, // 임시값
          nickname: '나',
        },
        content,
        isLiked: false,
        likeCount: 0,
        hasParent: false,
        parentId: null,
      },
    ]);
  };
  return (
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 pb-20 ">
      <ArticleHeader title="자유 라운지" />
      <div className="mt-10 pb-[90px]">
        <ArticleBody
          nickname={freeDetailData.member.nickname}
          time={freeDetailData.createdAt}
          title={freeDetailData.boardTitle}
          content={freeDetailData.boardContent}
          images={freeDetailData.imageUrls}
          likes={freeDetailData.liked}
          commentCount={freeDetailData.comment}
        />
        <CommentCard comments={comments} />
      </div>
      <ReplyInputSection addReply={addReply} />
    </div>
  );
}
