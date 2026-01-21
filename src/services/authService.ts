import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';

export const authService = {
  async signup(id: string, password: string, email: string) {
    try {
      const res = await authApi.signup({ userId: id, email, password });
      if (!res || !res.payload) {
        throw new Error('서버 응답에 데이터가 없습니다.');
      }
      //자동 로그인
      const { accessToken, userId } = res.payload;
      if (accessToken) {
        useAuthStore.getState().login(accessToken, userId);
        console.log('[signup] 자동 로그인 성공');
      }
      return res;
    } catch (err) {
      console.error('[signup] 실패', err);
      throw err;
    }
  },

  async login(userId: string, password: string) {
    const res = await authApi.login({ userId, password });
    if (!res) {
      throw new Error('로그인 응답이 없습니다.');
    }
    console.log('login', res);
    const { accessToken, userId: responseUserId } = res.payload;
    useAuthStore.getState().login(accessToken, responseUserId);
    return res;
  },

  async logout() {
    try {
      await authApi.logout();

      console.log('logout 성공');
    } catch (err) {
      console.error('logout 실패', err);
    } finally {
      //서버 실패해도 프론트 상태는 정리 (UX 안정화)
      useAuthStore.getState().logout();
    }
  },

  async checkId(userId: string) {
    if (!userId) return null;

    const result = await authApi.checkId(userId);
    if (!result) {
      throw new Error('로그인 응답이 없습니다.');
    }
    console.log('아이디 중복 체크 성공', result);
    return result.payload.isAvailable;
  },

  async refreshAccessToken() {
    const res = await authApi.reissue();
    if (!res) {
      useAuthStore.getState().logout();
      throw new Error('토큰 재발급 실패');
    }
    const { accessToken, userId } = res.payload;
    // 재발급 받은 새 토큰을 스토어에 업데이트
    useAuthStore.getState().login(accessToken, userId);
    return accessToken;
  },
};
