import create from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  isLoggedIn: boolean;
  authDetails: {
    accessToken: string;
    refreshToken: string;
  } | null;
  setAuthDetails: (authDetails: AuthState["authDetails"]) => void;
}
const useAuthStore = create<AuthState>()(
  immer((set) => ({
    isLoggedIn: false,
    authDetails: null,
    setAuthDetails(authDetails) {
      set({ authDetails, isLoggedIn: !!authDetails });
    },
  }))
);

export default useAuthStore;
