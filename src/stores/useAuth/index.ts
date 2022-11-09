import create from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  authDetails: {
    accessToken: string;
    refreshToken: string;
  } | null;
  setAuthDetails: (authDetails: AuthState["authDetails"]) => void;
}
const useAuthStore = create<AuthState>()(
  immer((set) => ({
    authDetails: null,
    setAuthDetails(authDetails) {
      set({ authDetails });
    },
  }))
);

export default useAuthStore;
