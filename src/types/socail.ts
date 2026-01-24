export interface Account {
  platform: 'GOOGLE' | 'NAVER' | 'KAKAO';
  email: string;
  connectedAt: string;
}
// types/social.ts
export interface LinkSocialAccountRequest {
  code: string;
  platform: 'KAKAO' | 'GOOGLE' | 'NAVER';
  state: string;
}
