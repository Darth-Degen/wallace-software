import { FC, useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Router from "next/router";
import { SlideType } from "@types";
import {
  HomeSlide,
  AboutSlide,
  ExperienceSlide,
  SkillsSlide,
  PortfolioSlide,
} from "../slides";
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
  const prevIndexRef = useRef<number>(currentSlideIndex);

  const currentSlide = slideOrder[currentSlideIndex];
  const currentPageData = getCurrentPageData();

  const { animationTrigger } = useSlideAnimations({
    currentSlide,
    previousSlide,
  });

  // Sync with URL on mount and listen for hash and route changes (logo click to '/')
  useEffect(() => {
    syncWithUrl();

    const handleHashChange = () => syncWithUrl();
    const handleRouteChange = () => syncWithUrl();

    window.addEventListener("hashchange", handleHashChange);
    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [syncWithUrl]);

  // Derive previousSlide and navigationDirection for any index change (footer click, URL change, arrows)
  useEffect(() => {
    const prev = prevIndexRef.current;
    if (prev !== currentSlideIndex) {
      setPreviousSlide(slideOrder[prev]);
      setNavigationDirection(currentSlideIndex > prev ? 1 : -1);
      prevIndexRef.current = currentSlideIndex;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex]);

  // Sync color theme when slide changes
  useEffect(() => {
    if (currentPageData) {
      setAccentColorAndSection(
        currentPageData.accentColor as AccentColor,
        currentPageData.path
      );
    }
  }, [currentSlideIndex, currentPageData, setAccentColorAndSection]);

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
