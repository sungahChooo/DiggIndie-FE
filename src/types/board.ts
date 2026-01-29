export interface FreeBoardDetail {
  boardId: number;
  category: string;
  title: string;
  writerNickname: string;
  createdAt: string;
  content: string;
  views: number;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  comments: Comment[];
  isAnonymous: boolean;
  isMine: boolean;
  imageUrls?: string[] ;
}
export interface Comment {
  commentId: number;
  writerNickname: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isMine: boolean;
  replies: Reply[];
}

export interface Reply {
  commentId: number;
  parentCommentId: number;
  writerNickname: string;
  replyToNickname: string;
  createdAt: string;
  isMine: boolean;
  content: string;
  likeCount: number;
  isLiked: boolean;
  depth: number;
}

export interface TradeBoardDetail {
  marketId: number;
  title: string;
  content: string;
  price: number;
  chatUrl: string;
  type: string;
  nickname: string;
  timeAgo: string;
  views: number;
  isScraped: boolean;
  scrapCount: number;
  isMine: boolean;
  imageUrls?: string[];
  images: [
    {
      imageUrl: string | undefined;
      imageOrder: number;
    },
  ];
}
export type HotArticle = {
  id: string;
  category: string;
  title: string;
  views: number;
};
