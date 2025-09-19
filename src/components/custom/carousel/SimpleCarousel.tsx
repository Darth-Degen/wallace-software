import { FC, useEffect } from "react";
import { useCarousel, useColorTheme, AccentColor } from "@stores";
import { cn } from "@utils";
import CarouselNavigationButton from "./CarouselNavigationButton";
import {
  HomeSlide,
  AboutSlide,
  ExperienceSlide,
  SkillsSlide,
  PortfolioSlide,
} from "../slides";

interface SimpleCarouselProps {
  className?: string;
}

const SimpleCarousel: FC<SimpleCarouselProps> = ({ className = "" }) => {
  const {
    currentSlide,
    nextSlide,
    prevSlide,
    getCurrentPageData,
    syncWithUrl,
  } = useCarousel();
  const { setAccentColorAndSection } = useColorTheme();

  const currentPageData = getCurrentPageData();

  // Map page names to their corresponding slide components
  const slideComponents = {
    Home: HomeSlide,
    About: AboutSlide,
    Experience: ExperienceSlide,
    Skills: SkillsSlide,
    Portfolio: PortfolioSlide,
  };

  // Get the current slide component
  const CurrentSlideComponent = currentPageData
    ? slideComponents[currentPageData.name as keyof typeof slideComponents]
    : HomeSlide;

  // Sync with URL on mount and listen for hash changes
  useEffect(() => {
    // Initial sync with URL
    syncWithUrl();

    // Listen for hash changes (e.g., back/forward navigation)
    const handleHashChange = () => {
      syncWithUrl();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [syncWithUrl]);

  // Sync color theme when slide changes
  useEffect(() => {
    if (currentPageData) {
      setAccentColorAndSection(
        currentPageData.accentColor as AccentColor,
        currentPageData.path
      );
    }
  }, [currentSlide, currentPageData, setAccentColorAndSection]);

  const handleNextSlide = () => {
    nextSlide();
  };

  const handlePrevSlide = () => {
    prevSlide();
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Main content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <CurrentSlideComponent className="w-full h-full" />
      </div>

      {/* Navigation */}
      <CarouselNavigationButton
        direction="left"
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
      />

      <CarouselNavigationButton
        direction="right"
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
      />
    </div>
  );
};

export default SimpleCarousel;
