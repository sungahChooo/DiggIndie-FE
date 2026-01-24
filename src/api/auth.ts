import { Account } from '@/types/socail';
import { fetchClient } from './client';

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
  //마이페이지 아이디 띄우기
  async getAuthURL(platform: 'KAKAO' | 'GOOGLE' | 'NAVER') {
    return await fetchClient<{ authUrl: string; state: string }>(`/auth/oauth2/url/${platform}`, {
      method: 'GET',
      auth: false,
    });
  },
  //소셜 로그인
  async socialLogin(code: string, platform: 'KAKAO' | 'GOOGLE' | 'NAVER', state: string) {
    return await fetchClient<{
      newMember: boolean;
      externalId: string;
      userId: string;
      email: string;
      platform: 'KAKAO' | 'GOOGLE' | 'NAVER';
      accessToken: string;
    }>('/auth/oauth2/login', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({
        code: code,
        platform: platform,
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
  async linkSocialAccount(code: string, platform: 'KAKAO' | 'GOOGLE' | 'NAVER', state: string) {
    return fetchClient<{ platform: string; email: string }>('/auth/oauth2/link', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ code, platform, state }),
    });
  },

  //소셜 계정 연동 해제하지
  async unlinkSocailAccount(platform: 'KAKAO' | 'GOOGLE' | 'NAVER') {
    return fetchClient<void>(`/auth/oauth2/unlink/${platform}`, {
      method: 'DELETE',
      auth: true,
    });
  },
};
