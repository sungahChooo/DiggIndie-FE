import { Keyword, KeywordResponse } from '@/types/api';
import { fetchClient } from './client';

export const onBoardApi = {
  async getOnboardingKeywords(): Promise<KeywordResponse> {
    return await fetchClient<Keyword[]>('/keywords', {
      method: 'GET',
      auth: true,
    });
  },
  async saveOnboardKeywords(keywordIds: number[]) {
    return await fetchClient('/my/keywords', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ keywordIds }),
    });
  },
};
