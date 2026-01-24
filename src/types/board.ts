export interface FreeBoardDetail {
  boardId: number;
  category: string;
  title: string;
  writerNickname: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
  views: number;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  comments: Comment[];
  isAnonymous: boolean;
  isMine: boolean;
}
export interface Comment {
  commentId: number;
  writerNickname: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  replies: Reply[];
}

export interface Reply {
  commentId: number;
  parentCommentId: number;
  writerNickname: string;
  replyToNickname: string;
  createdAt: string;
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
  images: [
    {
      imageUrl: string;
      imageOrder: number;
    },
  ];
}