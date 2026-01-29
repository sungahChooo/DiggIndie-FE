export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

//게시글 작성, 수정
export type FreePayload = {
  boardId: number;
}

export type FreeCategory =
  | "none"
  | "info"
  | "review"
  | "recommend"
  | "release"
  | "news"
  | "companion";


export type PostFreeParams = {
  title: string,
  content: string,
  isAnonymous: boolean,
  category: FreeCategory,
  imageUrls: string[]
}

//게시글 리스트
export type FreeArticle = {
  boardId: number;
  category: FreeCategory;
  title: string;
  createdAt: string;
  views: number;
  imageCount: number;
}

export type FreeListPayload = {
  boards: FreeArticle [];
  pageInfo: PageInfo;
}

export type GetFreeListParams = {
  category?: FreeCategory
  query?: string;
  page?: number;
  size?: number;
};

//게시글 수정
export type EditFreeParams = {
  boardId: number;
  title: string;
  content: string;
  isAnonymous: boolean;
  category: FreeCategory;
  imageUrls: string[];
};

//게시글 좋아요
export type LikeFreeParams = {
  boardId: number;
}

export type LikeFreePayload = {
  isLiked: boolean;
  likeCount : number;
}

//댓글 작성
export type CommentFreeParams = {
  boardId: number;
  content: string;
  isAnonymous: boolean;
  parentCommentId: number | null;
}

export type ChildCommentFree = {
  commentId: number;
  parentCommentId: number | null;
  writerNickname: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isMine: boolean;
  depth: number;
}

export type CommentFreePayload = {
  commentId: number;
  writerNickname: string;
  replyToNickname?: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isMine: boolean;
  replies: ChildCommentFree[]
}

//댓글 좋아요
export type LikeCommentFreeParams = {
  commentId: number;
}

export type LikeCommentFreePayload = {
  isLiked: boolean;
  likeCount : number;
}

//내가 쓸 게시글
export type MyFreeItem = {
  boardId: number;
  category: FreeCategory;
  title: string;
  views: number;
  imageCount: number;
  createdAt: string;
}

export type MyFreePayload = {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  pageInfo: PageInfo;
  payload: MyFreeItem[];
};

export type GetMyFreeParams = {
  page?: number;
  size?: number;
};