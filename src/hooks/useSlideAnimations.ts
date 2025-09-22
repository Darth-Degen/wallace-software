import { useEffect, useState } from "react";
import { SlideType } from "@types";

interface UseSlideAnimationsOptions {
  currentSlide: SlideType;
  previousSlide?: SlideType;
}

interface UseSlideAnimationsReturn {
  animationTrigger: "pageLoad" | "slideTransition";
  isTransitioning: boolean;
  triggerTransition: () => void;
}

export const useSlideAnimations = ({
  currentSlide,
  previousSlide
}: UseSlideAnimationsOptions): UseSlideAnimationsReturn => { 

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState<"pageLoad" | "slideTransition">("pageLoad");
  // Simple logic: if we have a previousSlide, it's a transition, otherwise it's a page load
  useEffect(() => { 

    if (previousSlide && previousSlide !== currentSlide) {
      // This is a slide transition
      setIsTransitioning(true);
      setAnimationTrigger("slideTransition");
      
      // Reset transition state after animation completes
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);

      return () => clearTimeout(timeout);
    } else if (!previousSlide) {
      // This is a page load (first time or no previous slide)
      setAnimationTrigger("pageLoad");
      setIsTransitioning(false);
    }
  }, [currentSlide, previousSlide]);

  const triggerTransition = () => {
    setIsTransitioning(true);
    setAnimationTrigger("slideTransition");
  };

  return {
    animationTrigger,
    isTransitioning,
    triggerTransition
  };
};
