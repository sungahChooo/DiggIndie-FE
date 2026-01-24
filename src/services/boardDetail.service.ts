import { communityDetailAPI } from '@/api/communityDetail';

export const boardDetailService = {
  async getFreeBoardDetail(boardId: number) {
    try {
      const res = await communityDetailAPI.fetchFreeBoardDetail(boardId);
      console.log('자유게시판 상세게시글 데이터', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  async getTradeBoardDetail(boardId: number) {
    try {
      const res = await communityDetailAPI.fetchTradeBoardDetail(boardId);
      console.log('거래/양도 게시판 상세게시글 데이터', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
};