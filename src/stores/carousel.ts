import { create } from "zustand";
import { PAGES } from "@constants";

interface CarouselState {
  currentSlide: number;
  setSlide: (slideIndex: number, updateUrl?: boolean) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  getCurrentPageData: () => typeof PAGES[0] | undefined;
  syncWithUrl: () => void;
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

export const useCarousel = create<CarouselState>()((set, get) => ({
  currentSlide: 0,
  
  setSlide: (slideIndex: number, updateUrl = true) => {
    const totalSlides = PAGES.filter(p => p.showInFooter).length;
    console.log("setSlide called with index:", slideIndex, "Total slides:", totalSlides);
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      set({ currentSlide: slideIndex });
      
      if (updateUrl) {
        const footerPages = PAGES.filter(p => p.showInFooter);
        const pageData = footerPages[slideIndex];
        if (pageData) {
          updateUrlHash(pageData.path);
        }
      }
    }
  },
  
  nextSlide: () => {
    const { currentSlide, setSlide } = get();
    const totalSlides = PAGES.filter(p => p.showInFooter).length;
    const nextIndex = (currentSlide + 1) % totalSlides;
    setSlide(nextIndex, true);
  },
  
  prevSlide: () => {
    const { currentSlide, setSlide } = get();
    const totalSlides = PAGES.filter(p => p.showInFooter).length;
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    setSlide(prevIndex, true);
  },
  
  getCurrentPageData: () => {
    const { currentSlide } = get();
    const footerPages = PAGES.filter(p => p.showInFooter);
    return footerPages[currentSlide];
  },
  
  syncWithUrl: () => {
    if (typeof window === "undefined") return;
    
    const hash = window.location.hash;
    const footerPages = PAGES.filter(p => p.showInFooter);
    
    // Find the page that matches the current hash
    const currentPath = hash ? `/#${hash.substring(1)}` : "/";
    const pageIndex = footerPages.findIndex(page => page.path === currentPath);
    
    if (pageIndex !== -1 && pageIndex !== get().currentSlide) {
      set({ currentSlide: pageIndex });
    }
  }
}));