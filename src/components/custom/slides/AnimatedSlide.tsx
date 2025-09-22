import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { SlideType, SlideData } from "@types";
import { getSlideAnimations } from "@constants";
import { cn } from "@utils";

interface AnimatedSlideProps {
  className?: string;
  slideType: SlideType;
  slideData: SlideData;
  animationTrigger: "pageLoad" | "slideTransition";
  children?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

const AnimatedSlide: FC<AnimatedSlideProps> = ({
  slideType,
  animationTrigger,
  className = "",
  children,
}) => {
  const animations = getSlideAnimations(slideType);

  // Choose the appropriate animation set based on trigger
  const containerVariants =
    animationTrigger === "pageLoad"
      ? animations.pageLoad.container
      : animations.slideTransition.enter;

  const titleVariants =
    animationTrigger === "pageLoad"
      ? animations.pageLoad.title
      : animations.slideTransition.enter;

  const descriptionVariants =
    animationTrigger === "pageLoad"
      ? animations.pageLoad.description
      : animations.slideTransition.enter;

  const childrenVariants =
    animationTrigger === "pageLoad"
      ? animations.pageLoad.children
      : animations.slideTransition.enter;

  return (
    <motion.div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center text-center px-6",
        className
      )}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children && children}
    </motion.div>
  );
};

export default AnimatedSlide;
