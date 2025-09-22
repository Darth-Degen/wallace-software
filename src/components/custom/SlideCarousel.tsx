import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideType } from "@types";
import {
  HomeSlide,
  AboutSlide,
  ExperienceSlide,
  SkillsSlide,
  PortfolioSlide,
} from "./slides";
import { useSlideAnimations } from "@hooks";
import { useCarousel, useColorTheme, AccentColor } from "@stores";
import { CarouselNavigationButton } from "@components";

const slideComponents = {
  home: HomeSlide,
  about: AboutSlide,
  experience: ExperienceSlide,
  skills: SkillsSlide,
  portfolio: PortfolioSlide,
};

const slideOrder: SlideType[] = [
  "home",
  "about",
  "experience",
  "skills",
  "portfolio",
];

const SlideCarousel: FC = () => {
  // Use carousel store for state management
  const {
    currentSlide: currentSlideIndex,
    nextSlide: carouselNextSlide,
    prevSlide: carouselPrevSlide,
    setSlide,
    getCurrentPageData,
    syncWithUrl,
  } = useCarousel();
  const { setAccentColorAndSection } = useColorTheme();

  const [previousSlide, setPreviousSlide] = useState<SlideType | undefined>();
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);

  const currentSlide = slideOrder[currentSlideIndex];
  const currentPageData = getCurrentPageData();

  const { animationTrigger } = useSlideAnimations({
    currentSlide,
    previousSlide,
  });

  // Sync with URL on mount and listen for hash changes
  useEffect(() => {
    syncWithUrl();
    const handleHashChange = () => syncWithUrl();
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
  }, [currentSlideIndex, currentPageData, setAccentColorAndSection]);

  const goToSlide = (index: number, direction?: 1 | -1) => {
    if (
      index >= 0 &&
      index < slideOrder.length &&
      index !== currentSlideIndex
    ) {
      setPreviousSlide(slideOrder[currentSlideIndex]);

      // Determine direction if not provided
      if (direction !== undefined) {
        setNavigationDirection(direction);
      } else {
        // Auto-determine direction based on index difference
        const diff = index - currentSlideIndex;
        setNavigationDirection(diff > 0 ? 1 : -1);
      }

      setSlide(index, true); // Use carousel store setSlide
    }
  };

  const nextSlide = () => {
    setPreviousSlide(slideOrder[currentSlideIndex]);
    setNavigationDirection(1);
    carouselNextSlide(); // Use carousel store nextSlide
  };

  const prevSlide = () => {
    setPreviousSlide(slideOrder[currentSlideIndex]);
    setNavigationDirection(-1);
    carouselPrevSlide(); // Use carousel store prevSlide
  };

  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Navigation Controls */}
      <CarouselNavigationButton
        direction="left"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
      />

      <CarouselNavigationButton
        direction="right"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
      />

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <CurrentSlideComponent
          key={currentSlide}
          animationTrigger={animationTrigger}
          direction={navigationDirection}
          className="relative z-0 h-full flex-grow"
        />
      </AnimatePresence>
    </div>
  );
};

export default SlideCarousel;
