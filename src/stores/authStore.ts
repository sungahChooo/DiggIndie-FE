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
