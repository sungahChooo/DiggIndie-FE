import { Account } from '@/types/socail';
import { fetchClient } from './client';
import { SocialLoginPayload } from '@/types/api';

export const authApi = {
  async signup(data: { userId: string; email: string; password: string }) {
    return await fetchClient<{ accessToken: string; userId: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false, // 회원가입 시에는 토큰이 필요 없음
    });
  },

  async login(data: { userId: string; password: string }) {
    return await fetchClient<{ accessToken: string; userId: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false,
    });
  },

  async logout() {
    return await fetchClient<void>('/auth/logout', {
      method: 'POST',
      auth: true,
    });
  },
  async checkId(userId: string) {
    return await fetchClient<{ isAvailable: boolean }>(
      `/auth/exists?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        auth: false,
      }
    );
  },
  async reissue() {
    return await fetchClient<{ accessToken: string; expiresIn: number }>('/auth/reissue', {
      method: 'POST',
      auth: true,
      credentials: 'include',
    });
  },

  //마이페이지 사용자 id를 띄우기 위함
  async getUserId() {
    return await fetchClient<{ memberId: string; userId: string }>('/my/user-id', {
      method: 'GET',
      auth: true,
    });
  },

  async checkEmail(data: { email: string; type: 'SIGNUP' | 'PASSWORD_RESET' | 'FIND_USER_ID' }) {
    return await fetchClient<{
      message: string;
      success: boolean;
      userId: string;
    }>('/auth/email/send', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(data),
    });
  },
  async verifyCode(data: {
    email: string;
    code: string;
    type: 'SIGNUP' | 'PASSWORD_RESET' | 'FIND_USER_ID';
    newPassword: string;
  }) {
    return await fetchClient<{
      message: string;
      success: boolean;
      userId: string;
      createdAt: string;
    }>('/auth/email/verify', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(data),
    });
  },
  //소셜 로그인 위한 인증 URL 반환
  async getAuthURL(platform: 'KAKAO' | 'GOOGLE' | 'NAVER', purpose: 'login' | 'link') {
    return await fetchClient<{ authUrl: string; state: string }>(
      `/auth/oauth2/url/${platform}?purpose=${purpose}`,
      {
        method: 'GET',
        auth: false,
      }
    );
  },
  //소셜 로그인 및 연동 통합
  async socialLogin(code: string, state: string) {
    return await fetchClient<SocialLoginPayload>('/auth/oauth2/callback', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({
        code: code,
        state: state,
      }),
    });
  },
  //마이페이지 연동된 소셜계정 조회
  async getSocialAccounts() {
    return fetchClient<{ accounts: Account[] }>('/auth/oauth2/accounts', {
      method: 'GET',
      auth: true,
    });
  },

  //소셜 계정 연동하기
  // async linkSocialAccount(code: string, platform: 'KAKAO' | 'GOOGLE' | 'NAVER', state: string) {
  //   return fetchClient<{ platform: string; email: string }>('/auth/oauth2/link', {
  //     method: 'POST',
  //     auth: true,
  //     body: JSON.stringify({ code, platform, state }),
  //   });
  // },

  //소셜 계정 연동 해제하지
  async unlinkSocailAccount(platform: 'KAKAO' | 'GOOGLE' | 'NAVER') {
    return fetchClient<void>(`/auth/oauth2/unlink/${platform}`, {
      method: 'DELETE',
      auth: true,
    });
  },

  //마케팅 동의 여부 조회
  async getMarketingAgree() {
    return fetchClient<{ marketingConsent: boolean }>('/my/marketing-consent', {
      method: 'GET',
      auth: true,
    });
  },

  //마케팅 수신 동의 여부 토글
  async toggleMarketingAgree(marketingConsent: boolean) {
    return fetchClient<{ marketingConsent: boolean }>('/my/marketing-consent', {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify({ marketingConsent: marketingConsent }),
    });
  },
};
