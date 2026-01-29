import { fetchClient } from '@/api/client';
import { HotArticle } from '@/types/board';

import {
  FreePayload,
  GetFreeListParams,
  PostFreeParams,
  FreeListPayload,
  EditFreeParams,
  LikeFreeParams,
  LikeFreePayload,
  CommentFreeParams,
  CommentFreePayload,
  LikeCommentFreeParams,
  LikeCommentFreePayload,
} from '@/types/freeBoard';

//게시글 작성
export async function postFree(params: PostFreeParams) {
  return fetchClient<FreePayload>('/boards', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(params),
  });
}

//게시글 리스트, 검색
export async function getFreeList(params: GetFreeListParams) {
  const { category = 'none', query = '', page = 0, size = 20 } = params;

  const qs = new URLSearchParams();
  qs.set('category', category);
  if (query.trim()) qs.set('query', query.trim());
  qs.set('page', String(page));
  qs.set('size', String(size));

  return fetchClient<FreeListPayload>(`/boards?${qs.toString()}`, {
    method: 'GET',
    auth: false,
  });
}

//게시글 삭제
export type DeleteFreeParams = { boardId: number };
export type DeleteFreePayload = unknown;

export async function deleteFree({ boardId }: DeleteFreeParams) {
  return fetchClient<DeleteFreePayload>(`/boards/${boardId}`, {
    method: 'DELETE',
    auth: true,
  });
}

//게시글 수정
export async function editFree(params: EditFreeParams) {
  const { boardId, ...body } = params;
  return fetchClient<FreePayload>(`/boards/${boardId}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(body),
  });
}

//게시글 좋아요
export async function likeFree(params: LikeFreeParams) {
  const { boardId } = params;
  return fetchClient<LikeFreePayload>(`/boards/${boardId}/like`, {
    method: 'PATCH',
    auth: true,
  });
}

//댓글 작성
export async function commentFree(params: CommentFreeParams) {
  const { boardId, ...body } = params;
  return fetchClient<CommentFreePayload>(`/boards/${boardId}/comments`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify(body),
  });
}

//댓글 좋아요
export async function likeCommentFree(params: LikeCommentFreeParams) {
  const { commentId } = params;
  return fetchClient<LikeCommentFreePayload>(`/boards/comments/${commentId}/like`, {
    method: 'PATCH',
    auth: true,
  });
}

//홈 인기게시글 불러오기
export async function getPopularArticle() {
  return fetchClient<HotArticle[]>('/boards/hot', { method: 'GET', auth: false });
}
