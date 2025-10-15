import { FC, useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Router from "next/router";
import { SlideType } from "@types";
import {
  AboutSlide,
  ExperienceSlide,
  SkillsSlide,
  PortfolioSlide,
} from "../slides";
import { useSlideAnimations, useWindowSize } from "@hooks";
import { useCarousel, useColorTheme, AccentColor } from "@stores";
import { CarouselNavigationButton } from "@components";

const slideComponents = {
  // home: AboutSlide,
  about: AboutSlide,
  experience: ExperienceSlide,
  skills: SkillsSlide,
  "portfolio-somosaxolotl": PortfolioSlide,
  "portfolio-scum": PortfolioSlide,
  "portfolio-folio": PortfolioSlide,
  "portfolio-cyberfrogs": PortfolioSlide,
  "portfolio-publique": PortfolioSlide,
  // "portfolio-sandbox": PortfolioSlide,
};

const slideOrder: SlideType[] = [
  // "home",
  "about",
  "experience",
  "skills",
  "portfolio-somosaxolotl",
  "portfolio-cyberfrogs",
  "portfolio-scum",
  "portfolio-folio",
  "portfolio-publique",
  // "portfolio-sandbox",
];

const SlideCarousel: FC = () => {
  // Use carousel store for state management
  const {
    currentSlide: currentSlideIndex,
    nextSlide: carouselNextSlide,
    prevSlide: carouselPrevSlide,
    getCarouselPages,
    getCurrentPageData,
    syncWithUrl,
  } = useCarousel();
  const { setAccentColorAndSection } = useColorTheme();
  const [winWidth, winHeight, isMobile, isTablet] = useWindowSize();

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

  // Portfolio state
  const pages = getCarouselPages();
  const currentPath = pages[currentSlideIndex]?.path ?? "";
  const isPortfolioSlide = /portfolio/i.test(currentPath);
  const lastPortfolioIndex = useMemo(() => {
    const indexes = pages
      .map((page, index) => ({ page, index }))
      .filter(({ page }) => /portfolio/i.test(page.path))
      .map(({ index }) => index);
    return indexes.length ? Math.max(...indexes) : -1;
  }, [pages]);
  const isLastPortfolio =
    isPortfolioSlide && currentSlideIndex === lastPortfolioIndex;

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
    <div className="relative w-full h-full flex flex-col flex-grow">
      {/* Navigation Controls */}
      {(!isMobile || isPortfolioSlide) && (
        <CarouselNavigationButton
          direction="left"
          onClick={carouselPrevSlide}
          className="fixed bottom-10 md:top-1/2 -translate-y-1/2 z-10 left-8 2xl:left-[max(1rem,calc((100vw-1512px)/2+1rem))]"
        />
      )}

      {(!isMobile || (isPortfolioSlide && !isLastPortfolio)) && (
        <CarouselNavigationButton
          direction="right"
          onClick={carouselNextSlide}
          className="fixed bottom-10 md:top-1/2 -translate-y-1/2 z-10 right-8 2xl:right-[max(1rem,calc((100vw-1512px)/2+1rem))]"
        />
      )}

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
