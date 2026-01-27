import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  isAuthed: boolean;
  ready: boolean;
  userId: string | null;
  login: (token: string, userId?: string) => void;
  logout: () => void;
  setReady: (v: boolean) => void;
};
//persist 방식 지움
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  userId: null,
  isAuthed: false,
  ready: false,
  setReady: (v) => set({ ready: v }),
  login: (token, userId) =>
    set((state) => ({ accessToken: token, userId: userId ?? state.userId, isAuthed: true })),
  logout: () =>
    set({
      accessToken: null,
      userId: null,
      isAuthed: false,
    }),
}));

interface FindIdResult {
  userId: string;
  createdAt: string;
}

type FindIdState = {
  result: FindIdResult | null;
  setResult: (data: FindIdResult) => void;
  clearResult: () => void;
};

export const useFindIdStore = create<FindIdState>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
  clearResult: () => set({ result: null }),
}));

interface PasswordResetState {
  email: string;
  resetToken: string;
  // 데이터를 저장하는 함수
  setResetInfo: (email: string, token: string) => void;
  // 초기화 함수 (재설정 완료 후 사용)
  clearResetInfo: () => void;
}

export const usePasswordResetStore = create<PasswordResetState>((set) => ({
  email: '',
  resetToken: '',
  setResetInfo: (email, token) => set({ email, resetToken: token }),
  clearResetInfo: () => set({ email: '', resetToken: '' }),
}));
