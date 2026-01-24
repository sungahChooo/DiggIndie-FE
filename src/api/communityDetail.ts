import { FreeBoardDetail, TradeBoardDetail } from '@/types/board';
import { fetchClient } from './client';

export const communityDetailAPI = {
  async fetchFreeBoardDetail(id: number) {
    return fetchClient<FreeBoardDetail>(`/boards/${id}`, {
      method: 'GET',
      auth: true,
    });
  },
  async fetchTradeBoardDetail(id: number) {
    return fetchClient<TradeBoardDetail>(`/markets/${id}`, {
      method: 'GET',
      auth: true,
    });
  },
};