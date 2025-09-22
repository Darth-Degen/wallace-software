import { Variants } from "framer-motion";
import { SlideAnimationConfig, SlideType } from "@types";

// Base timing and easing configurations
const timing = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  stagger: 1
};

const easing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const
};

// Page load animations - triggered when user lands directly on a slide
const createPageLoadAnimations = (
  titleDelay = 0.2,
  descriptionDelay = 0.4,
  childrenDelay = 0.6
): SlideAnimationConfig["pageLoad"] => ({
  container: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: timing.fast,
        when: "beforeChildren",
        staggerChildren: timing.stagger
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: timing.fast }
    }
  },
  title: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: timing.medium,
        delay: titleDelay,
        ease: easing.smooth
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: timing.fast }
    }
  },
  description: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: timing.medium,
        delay: descriptionDelay,
        ease: easing.smooth
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: timing.fast }
    }
  },
  children: {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: timing.medium,
        delay: childrenDelay,
        ease: easing.smooth,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      scale: 0.98,
      transition: { duration: timing.fast }
    }
  }
});

// Slide transition animations - triggered when navigating between slides
const createSlideTransitionAnimations = (
  enterDirection: "left" | "right" | "up" | "down" | "scale" = "right",
  exitDirection: "left" | "right" | "up" | "down" | "scale" = "left"
): SlideAnimationConfig["slideTransition"] => {
  const getEnterVariant = (direction: typeof enterDirection): Variants => {
    switch (direction) {
      case "left":
        return {
          initial: { x: -60, opacity: 0 },
          animate: { x: 0, opacity: 1, transition: { duration: timing.medium, ease: easing.smooth } }
        };
      case "right":
        return {
          initial: { x: 60, opacity: 0 },
          animate: { x: 0, opacity: 1, transition: { duration: timing.medium, ease: easing.smooth } }
        };
      case "up":
        return {
          initial: { y: -40, opacity: 0 },
          animate: { y: 0, opacity: 1, transition: { duration: timing.medium, ease: easing.smooth } }
        };
      case "down":
        return {
          initial: { y: 40, opacity: 0 },
          animate: { y: 0, opacity: 1, transition: { duration: timing.medium, ease: easing.smooth } }
        };
      case "scale":
        return {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1, transition: { duration: timing.medium, ease: easing.elastic } }
        };
    }
  };

  const getExitVariant = (direction: typeof exitDirection): Variants => {
    switch (direction) {
      case "left":
        return {
          exit: { x: -60, opacity: 0, transition: { duration: timing.fast, ease: easing.smooth } }
        };
      case "right":
        return {
          exit: { x: 60, opacity: 0, transition: { duration: timing.fast, ease: easing.smooth } }
        };
      case "up":
        return {
          exit: { y: -40, opacity: 0, transition: { duration: timing.fast, ease: easing.smooth } }
        };
      case "down":
        return {
          exit: { y: 40, opacity: 0, transition: { duration: timing.fast, ease: easing.smooth } }
        };
      case "scale":
        return {
          exit: { scale: 0.9, opacity: 0, transition: { duration: timing.fast, ease: easing.smooth } }
        };
    }
  };

  return {
    enter: getEnterVariant(enterDirection),
    exit: getExitVariant(exitDirection)
  };
};

// Slide-specific animation configurations
export const slideAnimations: Record<SlideType, SlideAnimationConfig> = {
  home: {
    pageLoad: createPageLoadAnimations(0.3, 0.6, 0.8),
    slideTransition: createSlideTransitionAnimations("scale", "scale")
  },
  about: {
    pageLoad: createPageLoadAnimations(0.2, 0.4, 0.6),
    slideTransition: createSlideTransitionAnimations("right", "left")
  },
  experience: {
    pageLoad: createPageLoadAnimations(0.1, 0.3, 0.5),
    slideTransition: createSlideTransitionAnimations("up", "down")
  },
  skills: {
    pageLoad: createPageLoadAnimations(0.2, 0.5, 0.7),
    slideTransition: createSlideTransitionAnimations("down", "up")
  },
  portfolio: {
    pageLoad: createPageLoadAnimations(0.3, 0.5, 0.7),
    slideTransition: createSlideTransitionAnimations("left", "right")
  }
};

// Utility function to get animations for a specific slide
export const getSlideAnimations = (slideType: SlideType): SlideAnimationConfig => {
  return slideAnimations[slideType];
};
