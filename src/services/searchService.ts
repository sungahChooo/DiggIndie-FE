import { searchApi } from '@/api/search';
export const searchService = {
  async saveRecent({ content }: { content: string }) {
    try {
      const result = await searchApi.saveRecent({ content });
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('검색어 저장 중 에러:', err);
      throw err;
    }
  },
  async getRecentSearches() {
    try {
      const res = await searchApi.getRecentSearches();
      return res; // 데이터 배열만 반환
    } catch (err) {
      console.error('최근 검색어 로드 중 에러:', err);
      return []; // 에러 시 빈 배열 반환
    }
  },
  async deleteRecentSearch(id: number) {
    try {
      await searchApi.deleteRecentSearch(id);
    } catch (err) {
      console.error('최근 검색어 개별 삭제 중 에러:', err);
    }
  },
  async clearRecentSearches() {
    try {
      await searchApi.clearRecentSearches();
    } catch (err) {
      console.error('최근 검색어 전체 삭제 중 에러:', err);
    }
  },
};
