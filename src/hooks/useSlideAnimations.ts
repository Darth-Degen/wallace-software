import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState<"pageLoad" | "slideTransition">("pageLoad");

  // Detect if this is a page load (no previous slide or router just loaded)
  useEffect(() => {
    const isPageLoad = !previousSlide || router.isReady === false;
    setAnimationTrigger(isPageLoad ? "pageLoad" : "slideTransition");
  }, [currentSlide, previousSlide, router.isReady]);

  // Handle slide transitions
  useEffect(() => {
    if (previousSlide && previousSlide !== currentSlide) {
      setIsTransitioning(true);
      setAnimationTrigger("slideTransition");
      
      // Reset transition state after animation completes
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Adjust based on your animation duration

      return () => clearTimeout(timeout);
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
