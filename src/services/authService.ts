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
    const { accessToken, userId: responseUserId } = res.payload;
    useAuthStore.getState().login(accessToken, responseUserId);
    //  곧바로 userId 정보도 가져와서 스토어 완성시키기
    await this.getUserId();
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
    const { accessToken } = res.payload;
    // 재발급 받은 새 토큰을 스토어에 업데이트
    useAuthStore.getState().login(accessToken);
    return accessToken;
  },

  async getUserId() {
    try {
      const res = await authApi.getUserId();
      const { userId } = res.payload;
      // API 호출 성공 시 스토어의 userId를 업데이트
      useAuthStore.getState().login(useAuthStore.getState().accessToken!, res.payload.userId);
      return userId;
    } catch (err) {
      console.log('user id 조회 api 오류', err);
    }
  },
  async checkEmail(email: string, type: 'SIGNUP' | 'PASSWORD_RESET' | 'FIND_USER_ID') {
    if (!email) return null;
    try {
      const res = await authApi.checkEmail({ email: email, type: type });
      console.log('email 유효성 검사', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  async verifyCode(
    email: string,
    code: string,
    type: 'SIGNUP' | 'PASSWORD_RESET' | 'FIND_USER_ID'
  ) {
    try {
      const res = await authApi.verifyCode({
        email: email,
        code: code,
        type: type,
      });
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  async getAuthURL(platform: 'KAKAO' | 'GOOGLE' | 'NAVER', purpose: 'login' | 'link') {
    try {
      const res = await authApi.getAuthURL(platform, purpose);
      console.log('auth url 데이터', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  //소셜 로그인 및 연동 통합
  async socialLogin(code: string, state: string) {
    try {
      const res = await authApi.socialLogin(code, state);
      console.log('소셜 로그인 반환 데이터', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  //마이페이지 연동된 소셜 계정 조회
  async getSocialAcounts() {
    try {
      const res = await authApi.getSocialAccounts();
      console.log('연동된 소셜계정 조회', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },

  //마이페이지 소셜계정 연동 토글
  // async linkSocialAccount(code: string, platform: 'KAKAO' | 'GOOGLE' | 'NAVER', state: string) {
  //   try {
  //     const res = await authApi.linkSocialAccount(code, platform, state);
  //     console.log('마이페이지 소셜 계정 연동하기', res.payload);
  //     return res.payload;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  //마이페이지 소셜 계정 연동 해제
  async unlinkSocialAccount(platform: 'KAKAO' | 'GOOGLE' | 'NAVER') {
    try {
      await authApi.unlinkSocailAccount(platform);
      console.log('소셜로그인 해제 성공');
    } catch (err) {
      throw err;
    }
  },

  //마케팅 수신 동의 여부 조회
  async getMarketingAgree() {
    try {
      const res = await authApi.getMarketingAgree();
      console.log('마케팅 수신 동의 여부 조회', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },

  //마케팅 수신 동의 여부 토글
  async toggleMarketingAgree(marketingConsent: boolean) {
    try {
      const res = await authApi.toggleMarketingAgree(marketingConsent);
      console.log('마케팅 수신 동의 여부 토글', res.payload);
      return res.payload;
    } catch (err) {
      throw err;
    }
  },
  //비밀번호 초기화
  async resetPw(email: string, resetToken: string, password: string) {
    try {
      await authApi.resetPw(email, resetToken, password);
    } catch (err) {
      throw err;
    }
  },
};
