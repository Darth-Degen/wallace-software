// src/stores/colorTheme.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const accentColors = {
  orange: { hsl: '14 100% 68%', foreground: '0 0% 7%' },   // #FF805C - dark text for better contrast
  yellow: { hsl: '43 100% 57%', foreground: '0 0% 7%' },   // Yellow - dark text
  green: { hsl: '142 45% 54%', foreground: '0 0% 0%' },    // Green - black text
  blue: { hsl: '220 78% 61%', foreground: '0 0% 7%' },     // Blue - dark text for better contrast
  purple: { hsl: '265 72% 57%', foreground: '0 0% 7%' },   // Purple - dark text for better contrast
  red: { hsl: '6 100% 47%', foreground: '0 0% 7%' },       // Red - dark text for better contrast  
  pink: { hsl: '330 81% 60%', foreground: '0 0% 7%' },     // Pink - dark text for better contrast
  teal: { hsl: '178 78% 57%', foreground: '0 0% 0%' },     // Teal - black text
} as const;

export type AccentColor = keyof typeof accentColors;

interface ColorThemeState {
  currentAccent: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  cycleAccentColor: () => void;
  applyAccentToDOM: (color: AccentColor) => void;
}

const colorOrder: AccentColor[] = ['orange', 'yellow', 'green', 'blue', 'purple', 'red', 'pink', 'teal'];

/**
 * Apply accent color to DOM by updating CSS custom properties
 */
const applyAccentToDOM = (color: AccentColor) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    const { hsl, foreground } = accentColors[color];
    
    root.style.setProperty('--accent', hsl);
    root.style.setProperty('--accent-foreground', foreground);
  }
};

export const useColorTheme = create<ColorThemeState>()(
  persist(
    (set, get) => ({
      currentAccent: 'orange', // default color
      
      setAccentColor: (color: AccentColor) => {
        applyAccentToDOM(color);
        set({ currentAccent: color });
      },
      
      cycleAccentColor: () => {
        const current = get().currentAccent;
        const currentIndex = colorOrder.indexOf(current);
        const nextColor = colorOrder[(currentIndex + 1) % colorOrder.length];
        get().setAccentColor(nextColor);
      },
      
      applyAccentToDOM, // expose the function for external use
    }),
    {
      name: 'color-theme-storage', // localStorage key
      // Only persist the currentAccent, not the functions
      partialize: (state) => ({ currentAccent: state.currentAccent }),
      // Rehydrate: apply the persisted color to DOM when store loads
      onRehydrateStorage: () => (state) => {
        if (state?.currentAccent) {
          applyAccentToDOM(state.currentAccent);
        }
      },
    }
  )
);
