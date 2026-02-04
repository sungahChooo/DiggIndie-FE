import { onBoardApi } from '@/api/onBoard';

export const onBoardKeywordService = {
  async getKeywords() {
    try {
      const result = await onBoardApi.getOnboardingKeywords();
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('키워드 로드 중 에러:', err);
      return []; // 에러 시 빈 배열 반환
    }
  },
  async saveSelectedKeywords(keywordIds: number[]) {
    try {
      await onBoardApi.saveOnboardKeywords(keywordIds);
    } catch (err) {
      if (err instanceof SyntaxError && err.message.includes('JSON')) {
        console.log('키워드 저장 성공 (Response Body 없음)');
        return;
      }
      console.error('키워드 저장 중 에러:', err);
    }
  },
  async getSeletedKeywords() {
    try {
      const result = await onBoardApi.getSelectedOnboardingKeywords();
      return result.payload; // 데이터 배열만 반환
    } catch (err) {
      console.error('선택된 키워드 로드 중 에러:', err);
      return []; // 에러 시 빈 배열 반환
    }
  },

  //취향 재설정: 온보딩 선택했던 아티스트 불러오기
  async getSelectedArtists() {
    try {
      const result = await onBoardApi.getSelectedOnboardingArtists();
      console.log('저장된 온보딩 아티스트 반환', result.payload.bands);
      return result.payload.bands; // 데이터 배열만 반환
    } catch (err) {
      console.error('선택된 아티스트 로드 중 에러:', err);
      throw err; // 에러 시 빈 배열 반환
    }
  },
};
