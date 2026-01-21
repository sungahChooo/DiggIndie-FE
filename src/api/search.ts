import { fetchClient } from './client';
import { RecentSearch, RecentSearchResponse } from '@/types/searches';

export const searchApi = {
  async saveRecent({ content }: { content: string }) {
    const res = await fetchClient<void>('/search/recent', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ content }),
    });
    if (!res) {
      throw new Error('검색어 저장 실패.');
    }
    console.log('검색어 저장 반환 데이터', res.payload);
    return res;
  },

  async getRecentSearches(): Promise<RecentSearch[]> {
    const res = await fetchClient<RecentSearchResponse>('/search/recent', {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('최근 검색어 조회 실패.');
    }
    console.log(res);
    return res.payload.searches;
  },

  async deleteRecentSearch(id: number) {
    const res = await fetchClient<void>(`/search/recent/${id}`, {
      method: 'DELETE',
      auth: true,
    });
    if (!res) {
      throw new Error('최근 검색어 삭제 실패.');
    }
  },

  async clearRecentSearches() {
    const res = await fetchClient<void>('/search/recent', {
      method: 'DELETE',
      auth: true,
    });
    if (!res) {
      throw new Error('최근 검색어 전체 삭제 실패.');
    }
  },
};
