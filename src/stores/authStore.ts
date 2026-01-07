import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  isAuthed: boolean;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};
//persist 방식 지움
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  userId: null,
  isAuthed: false,
  login: (token, userId) => set({ accessToken: token, userId, isAuthed: true }),
  logout: () =>
    set({
      accessToken: null,
      userId: null,
      isAuthed: false,
    }),
}));
