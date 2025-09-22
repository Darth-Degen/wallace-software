import { FC, useState } from "react";
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<SlideType | undefined>();
  const [navigationDirection, setNavigationDirection] = useState<1 | -1>(1);

  const currentSlide = slideOrder[currentSlideIndex];
  const { animationTrigger } = useSlideAnimations({
    currentSlide,
    previousSlide,
  });

  // Debug logging
  console.log(
    "SlideCarousel - currentSlide:",
    currentSlide,
    "previousSlide:",
    previousSlide,
    "animationTrigger:",
    animationTrigger
  );

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

      setCurrentSlideIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlideIndex + 1) % slideOrder.length;
    goToSlide(nextIndex, 1); // Moving right/forward
  };

  const prevSlide = () => {
    const prevIndex =
      (currentSlideIndex - 1 + slideOrder.length) % slideOrder.length;
    goToSlide(prevIndex, -1); // Moving left/backward
  };

  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <motion.button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <motion.button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {slideOrder.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlideIndex
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <CurrentSlideComponent
          key={currentSlide}
          animationTrigger={animationTrigger}
          direction={navigationDirection}
          className="relative z-0"
        />
      </AnimatePresence>

      {/* Slide Title Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <motion.div
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10"
        >
          <span className="text-white/80 text-sm font-medium capitalize">
            {currentSlide}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SlideCarousel;
