import create from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  isLoggedIn: boolean;
  user: {
    accessToken: string;
    refreshToken: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: AuthState["user"]) => void;
}
const useAuthStore = create<AuthState>()(
  immer((set) => ({
    isLoggedIn: false,
    user: null,
    setUser(user) {
      set({ user, isLoggedIn: !!user });
    },
  }))
);

export default useAuthStore;
