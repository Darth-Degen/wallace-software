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
  childrenDelay = 0.2,
  animationType: "fade" | "scale" | "up" = "up"
): SlideAnimationConfig["pageLoad"] => {
  const getChildrenInitial = () => {
    switch (animationType) {
      case "fade":
        return { opacity: 0 };
      case "scale":
        return { opacity: 0, scale: 0.95 };
      case "up":
        return { opacity: 0, y: 20 };
    }
  };

  const getChildrenAnimate = () => {
    switch (animationType) {
      case "fade":
        return { opacity: 1 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "up":
        return { opacity: 1, y: 0 };
    }
  };

  return {
    container: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          duration: timing.fast,
          when: "beforeChildren"
        }
      },
      exit: { 
        opacity: 0,
        transition: { duration: timing.fast }
      }
    },
    children: {
      initial: getChildrenInitial(),
      animate: { 
        ...getChildrenAnimate(),
        transition: {
          duration: timing.medium,
          delay: childrenDelay,
          ease: easing.smooth,
          when: "beforeChildren",
          staggerChildren: 0.08
        }
      },
      exit: { 
        opacity: 0, 
        y: -10,
        scale: 0.98,
        transition: { duration: timing.fast }
      }
    }
  };
};

// Slide transition animations - triggered when navigating between slides
const createSlideTransitionAnimations = (
  enterDirection: "left" | "right" | "up" | "down" | "scale" = "right",
  exitDirection: "left" | "right" | "up" | "down" | "scale" = "left"
): SlideAnimationConfig["slideTransition"] => {
  
  // Container animations
  const getContainerEnter = (): Variants => ({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: timing.fast,
        when: "beforeChildren"
      }
    }
  });

  const getContainerExit = (): Variants => ({
    exit: { 
      opacity: 0,
      transition: {
        duration: timing.fast,
        when: "afterChildren"
      }
    }
  });

  // Children enter animations
  const getChildrenEnter = (direction: typeof enterDirection): Variants => {
    const baseTransition = {
      duration: timing.medium,
      ease: easing.smooth,
      when: "beforeChildren" as const,
      staggerChildren: 0.05,
      delayChildren: 0.1
    };

    switch (direction) {
      case "left":
        return {
          initial: { x: -40, opacity: 0 },
          animate: { 
            x: 0, 
            opacity: 1, 
            transition: baseTransition
          }
        };
      case "right":
        return {
          initial: { x: 40, opacity: 0 },
          animate: { 
            x: 0, 
            opacity: 1, 
            transition: baseTransition
          }
        };
      case "up":
        return {
          initial: { y: -30, opacity: 0 },
          animate: { 
            y: 0, 
            opacity: 1, 
            transition: baseTransition
          }
        };
      case "down":
        return {
          initial: { y: 30, opacity: 0 },
          animate: { 
            y: 0, 
            opacity: 1, 
            transition: baseTransition
          }
        };
      case "scale":
        return {
          initial: { scale: 0.95, opacity: 0 },
          animate: { 
            scale: 1, 
            opacity: 1, 
            transition: baseTransition
          }
        };
    }
  };

  // Children exit animations with staggering
  const getChildrenExit = (direction: typeof exitDirection): Variants => {
    const baseTransition = {
      duration: timing.medium, // Longer duration for smoother exit
      ease: easing.smooth,
      staggerChildren: 0.05,
      staggerDirection: -1 // Reverse stagger for exit
    };

    switch (direction) {
      case "left":
        return {
          exit: { 
            x: -40, 
            opacity: 0, 
            transition: baseTransition
          }
        };
      case "right":
        return {
          exit: { 
            x: 40, 
            opacity: 0, 
            transition: baseTransition
          }
        };
      case "up":
        return {
          exit: { 
            y: -30, 
            opacity: 0, 
            transition: baseTransition
          }
        };
      case "down":
        return {
          exit: { 
            y: 30, 
            opacity: 0, 
            transition: baseTransition
          }
        };
      case "scale":
        return {
          exit: { 
            scale: 0.95, 
            opacity: 0, 
            transition: baseTransition
          }
        };
    }
  };

  return {
    container: {
      enter: getContainerEnter(),
      exit: getContainerExit()
    },
    children: {
      enter: getChildrenEnter(enterDirection),
      exit: getChildrenExit(exitDirection)
    }
  };
};

// Slide-specific animation configurations
// For horizontal navigation: right arrow = exit left, enter right; left arrow = exit right, enter left
export const slideAnimations: Record<SlideType, SlideAnimationConfig> = {
  home: {
    pageLoad: createPageLoadAnimations(0.3, "scale"),
    slideTransition: createSlideTransitionAnimations("right", "left") // enters from right, exits to left
  },
  about: {
    pageLoad: createPageLoadAnimations(0.2, "up"),
    slideTransition: createSlideTransitionAnimations("right", "left") // enters from right, exits to left
  },
  experience: {
    pageLoad: createPageLoadAnimations(0.1, "fade"),
    slideTransition: createSlideTransitionAnimations("right", "left") // enters from right, exits to left
  },
  skills: {
    pageLoad: createPageLoadAnimations(0.2, "up"),
    slideTransition: createSlideTransitionAnimations("right", "left") // enters from right, exits to left
  },
  portfolio: {
    pageLoad: createPageLoadAnimations(0.3, "scale"),
    slideTransition: createSlideTransitionAnimations("right", "left") // enters from right, exits to left
  }
};

// Utility function to get animations for a specific slide
export const getSlideAnimations = (slideType: SlideType): SlideAnimationConfig => {
  return slideAnimations[slideType];
};

// Utility function to get directional slide animations based on navigation direction
export const getDirectionalSlideAnimations = (
  slideType: SlideType,
  direction: 1 | -1 // 1 for right arrow (next), -1 for left arrow (previous)
): SlideAnimationConfig["slideTransition"] => {
  const baseConfig = slideAnimations[slideType].slideTransition;
  
  // If going right (next slide), content exits left and new content enters from right
  // If going left (previous slide), content exits right and new content enters from left
  if (direction === 1) {
    // Next slide: exit left, enter right
    return createSlideTransitionAnimations("right", "left");
  } else {
    // Previous slide: exit right, enter left  
    return createSlideTransitionAnimations("left", "right");
  }
};
