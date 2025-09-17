import { FC, useEffect } from "react";
import { useCarousel, useColorTheme, AccentColor } from "@stores";
import { cn } from "@utils";
import CarouselNavigationButton from "./CarouselNavigationButton";

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
      <div className="flex-1 min-h-0 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {currentPageData?.name || "Loading..."}
          </h2>
          <p className="text-lg text-muted-foreground">
            Welcome to {currentPageData?.name.toLowerCase()} section
          </p>
        </div>
      </div>

      {/* Navigation */}
      <CarouselNavigationButton
        direction="left"
        onClick={handlePrevSlide}
        className="absolute-left"
      />

      <CarouselNavigationButton
        direction="right"
        onClick={handleNextSlide}
        className="absolute-right"
      />
    </div>
  );
};

export default SimpleCarousel;
