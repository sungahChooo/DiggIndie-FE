import { OnboardArtist } from './artists';

export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: T;
}
export interface Keyword {
  keywordId: number;
  keyword: string;
}
export interface KeywordResponse {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  payload: Keyword[];
}

export interface SelectedArtistsResponse {
  bands: OnboardArtist[];
}
//소셜로그인 응답
export type LoginData = {
  newMember: boolean;
  externalId: string;
  userId: string;
  email: string;
  platform: 'KAKAO' | 'GOOGLE' | 'NAVER';
  accessToken: string;
};

export type LinkData = {
  success: boolean;
  platform: 'KAKAO' | 'GOOGLE' | 'NAVER';
  email: string;
  message: string;
};

export type SocialLoginPayload =
  | {
      type: 'login';
      loginData: LoginData;
      linkData?: never;
    }
  | {
      type: 'link';
      loginData?: never;
      linkData: LinkData;
    };
