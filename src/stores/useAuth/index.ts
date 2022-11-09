import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface AuthState {
  authDetails: {
    accessToken: string;
    refreshToken: string;
  } | null;
  remember: boolean;
  setAuthDetails: (authDetails: AuthState["authDetails"]) => void;
  setAuthStore: (state: Partial<AuthState>) => void;
}
const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      authDetails: null,
      remember: false,
      setAuthDetails(authDetails) {
        set({ authDetails });
      },
      setAuthStore(state) {
        set(state);
      },
    })),
    {
      name: "user_details",
      partialize: (state) => {
        if (state.remember) return state;
      },
    }
  )
);

export default useAuthStore;
