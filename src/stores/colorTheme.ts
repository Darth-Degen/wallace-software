// src/stores/colorTheme.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const accentColors = {
  orange: { hsl: '14 100% 68%', foreground: '0 0% 7%' },   // #FF805C - dark text for better contrast
  yellow: { hsl: '43 100% 63%', foreground: '0 0% 7%' },   // Yellow - dark text
  blue: { hsl: '225 100% 63%', foreground: '0 0% 7%' },     // Blue - dark text for better contrast 
  //portfolio colors
  scum:       { hsl: '155 51% 72%',  foreground: '0 0% 7%' },   // #93DCBE
  somos:      { hsl: '42 87% 63%',   foreground: '0 0% 7%' },   // #F3C24F
  sandbox:    { hsl: '51 64% 78%',   foreground: '0 0% 7%' },   // #EBE1A5
  folio:      { hsl: '22 67% 64%',   foreground: '0 0% 7%' },   // #E19367
  cyberfrogs: { hsl: '160 35% 42%',   foreground: '0 0% 7%' },  // #203E2F (dark -> light text)
  publique:   { hsl: '43 100% 63%', foreground: '0 0% 7%' },  
} as const;

export type AccentColor = keyof typeof accentColors;

interface ColorThemeState {
  currentAccent: AccentColor;
  activeSection: string;
  setAccentColor: (color: AccentColor) => void;
  setActiveSection: (section: string) => void;
  setAccentColorAndSection: (color: AccentColor, section: string) => void;
  cycleAccentColor: () => void;
  applyAccentToDOM: (color: AccentColor) => void;
}

const colorOrder: AccentColor[] = ['orange', 'yellow', 'blue', 'scum',  'somos', 'sandbox', 'folio', 'cyberfrogs', 'publique'];
/**
 * Apply accent color to DOM by updating CSS custom properties
 * Safe for SSR - only runs on client side
 */
const applyAccentToDOM = (color: AccentColor) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
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
      activeSection: '/', // default section
      
      setAccentColor: (color: AccentColor) => {
        applyAccentToDOM(color);
        set({ currentAccent: color });
      },

      setActiveSection: (section: string) => {
        set({ activeSection: section });
      },

      setAccentColorAndSection: (color: AccentColor, section: string) => {
        applyAccentToDOM(color);
        set({ currentAccent: color, activeSection: section });
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
      // Only persist the currentAccent and activeSection, not the functions
      partialize: (state) => ({ 
        currentAccent: state.currentAccent,
        activeSection: state.activeSection 
      }),
      // Rehydrate: apply the persisted color to DOM when store loads
      onRehydrateStorage: () => (state) => {
        // Only run on client side to avoid SSR issues
        if (typeof window !== 'undefined' && state?.currentAccent) {
          applyAccentToDOM(state.currentAccent);
        }
      },
      // Skip hydration during SSR
      skipHydration: true,
    }
  )
);
