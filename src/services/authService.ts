import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';

export const authService = {
  async signup(id: string, password: string, emailLocal: string, emailDomain: string) {
    const email = `${emailLocal}${emailDomain}`;
    try {
      const res = await authApi.signup({ userId: id, email, password });
      console.log('[signup] 응답 성공', res.payload);
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
    try {
      const res = await authApi.login({ userId, password });
      const { accessToken, userId: responseUserId } = res.payload;
      useAuthStore.getState().login(accessToken, responseUserId);
      console.log('login 성공', res.payload);
      return res;
    } catch (err) {
      console.log('login 실패', err);
      throw err;
    }
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
    try {
      if (!userId) return null;

      const result = await authApi.checkId(userId);

      console.log('아이디 중복 체크 성공');
      return result.payload.isAvailable;
    } catch (err) {
      console.log('아이디 중복 체크 실패', err);
    }
  },

  async refreshAccessToken() {
    try {
      const res = await authApi.reissue();
      const { accessToken, userId } = res.payload;

      // 재발급 받은 새 토큰을 스토어에 업데이트
      useAuthStore.getState().login(accessToken, userId);
      return accessToken;
    } catch (err) {
      console.log('access token 재발급 실패', err);
      // Refresh Token까지 만료된 상황
      useAuthStore.getState().logout();
      throw err;
    }
  },
};
