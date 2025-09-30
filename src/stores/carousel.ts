import { create } from "zustand";
import { PAGES } from "@constants";

interface CarouselState {
  currentSlide: number;
  setSlide: (slideIndex: number, updateUrl?: boolean) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  getCurrentPageData: () => (typeof PAGES)[0] | undefined;
  syncWithUrl: () => void;

  // setHomeSlide: () => void;
  setFooterSlide: (footerIndex: number) => void;
  getCarouselPages: () => (typeof PAGES)[number][];
  footerToCarouselMap: number[]; // footer index -> carousel index
}

// Helper function to update URL hash
const updateUrlHash = (path: string) => {
  if (typeof window !== "undefined") {
    const hash = path === "/" ? "" : path.replace("/#", "#");
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash || window.location.pathname);
    }
  }
};

// Precompute pure functions (safe to recompute if PAGES is static)
const computeCarouselPages = () => PAGES.filter((p) => !p.hideFromCarousel);
const computeFooterPages = () => PAGES.filter((p) => p.showInFooter);
const computeFooterToCarouselMap = (
  carousel: typeof PAGES,
  footer: typeof PAGES
) => footer.map((f) => carousel.findIndex((c) => c.path === f.path));

export const useCarousel = create<CarouselState>()((set, get) => {
  const carouselPages = computeCarouselPages();
  const footerPages = computeFooterPages();
  const footerToCarouselMap = computeFooterToCarouselMap(
    carouselPages,
    footerPages
  );

  return {
    currentSlide: 0,
    footerToCarouselMap,

    getCarouselPages: () => computeCarouselPages(),
    getFooterPages: () => computeFooterPages(),

    setSlide: (slideIndex, updateUrl = true) => {
      const pages = get().getCarouselPages();
      if (slideIndex < 0 || slideIndex >= pages.length) return;
      set({ currentSlide: slideIndex });
      if (updateUrl) {
        const page = pages[slideIndex];
        if (page) updateUrlHash(page.path);
      }
    },

    // setHomeSlide: () => {
    //   const homeIndex = get().getCarouselPages().findIndex(p => p.path === "/");
    //   if (homeIndex !== -1) {
    //     get().setSlide(homeIndex, true);
    //   }
    // },

    setFooterSlide: (footerIndex: number) => {
      const map = get().footerToCarouselMap;
      const target = map[footerIndex];
      if (target != null && target >= 0) {
        get().setSlide(target, true);
      }
    },

    nextSlide: () => {
      const pages = get().getCarouselPages();
      const { currentSlide } = get();
      const next = (currentSlide + 1) % pages.length;
      get().setSlide(next, true);
    },

    prevSlide: () => {
      const pages = get().getCarouselPages();
      const { currentSlide } = get();
      const prev = (currentSlide - 1 + pages.length) % pages.length;
      get().setSlide(prev, true);
    },

    getCurrentPageData: () => {
      const pages = get().getCarouselPages();
      return pages[get().currentSlide];
    },

    syncWithUrl: () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      const pathFromUrl = hash ? `/#${hash.slice(1)}` : "/";

      const carouselPagesNow = get().getCarouselPages();
      const idx = carouselPagesNow.findIndex(p => p.path === pathFromUrl);

      if (idx !== -1) {
        if (idx !== get().currentSlide) set({ currentSlide: idx });
        return;
      }

      // If the path corresponds to a hidden page (e.g. Home) do not change currentSlide.
      const hidden = PAGES.find(p => p.path === pathFromUrl && p.hideFromCarousel);
      if (hidden) return;

      // Fallback: if hash invalid, keep currentSlide or reset to 0
      if (get().currentSlide >= carouselPagesNow.length) {
        set({ currentSlide: 0 });
      }
    },
  };
});
