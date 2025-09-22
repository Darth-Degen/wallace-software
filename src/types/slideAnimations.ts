import { Variants } from "framer-motion";

export type SlideType = "home" | "about" | "experience" | "skills" | "portfolio";

export interface SlideData {
  id: SlideType;
  title: string;
  description: string;
}

export interface SlideAnimationConfig {
  pageLoad: {
    container: Variants;
    children: Variants;
  };
  slideTransition: {
    container: {
      enter: Variants;
      exit: Variants;
    };
    children: {
      enter: Variants;
      exit: Variants;
    };
  };
}

export interface SlideAnimationProps {
  slideType: SlideType;
  animationTrigger: "pageLoad" | "slideEnter" | "slideExit";
  direction?: 1 | -1; // For directional animations
}
