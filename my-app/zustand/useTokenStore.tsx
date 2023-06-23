import { create } from "zustand";

interface UseTokenStore {
  state:
    | {
        type: "loading";
      }
    | {
        type: "ready";
        token: string | null;
      };

  setState: (token: string | null) => void;
}

export const useTokenStore = create<UseTokenStore>((set) => ({
  state: { type: "loading" },
  setState: (token) => {
    set(() => ({
      state: {
        type: "ready",
        token,
      },
    }));
  },
}));
