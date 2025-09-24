import { create } from "zustand";

export interface LoadingState { 
  assets: Record<string, boolean>;  /** Map of asset keys to loaded state */ 
  setAsset: (key: string, loaded: boolean) => void;/** Mark a single asset as loaded/unloaded */ 
  setAssets: (entries: Record<string, boolean>) => void;  /** Merge multiple asset flags at once */ 
  resetKeys: (keys: string[]) => void;  /** Remove specific keys (so they’re considered not loaded) */ 
  resetAll: () => void; /** Clear all tracked assets */ 
  areAllLoaded: (keys: string[]) => boolean;  /** Helper: are all provided keys loaded? */
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  assets: {},

  setAsset: (key, loaded) =>
    set((state) => ({ assets: { ...state.assets, [key]: loaded } })),

  setAssets: (entries) =>
    set((state) => ({ assets: { ...state.assets, ...entries } })),

  resetKeys: (keys) =>
    set((state) => {
      const next = { ...state.assets };
      for (const k of keys) delete next[k];
      return { assets: next };
    }),

  resetAll: () => set({ assets: {} }),

  areAllLoaded: (keys) => keys.every((k) => !!get().assets[k]),
}));

