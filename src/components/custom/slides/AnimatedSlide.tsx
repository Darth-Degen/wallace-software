import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { SlideType, SlideData } from "@types";
import { getSlideAnimations } from "@constants";
import { cn } from "@utils";

interface AnimatedSlideProps {
  slideType: SlideType;
  slideData: SlideData;
  animationTrigger: "pageLoad" | "slideTransition";
  className?: string;
  children?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

const AnimatedSlide: FC<AnimatedSlideProps> = ({
  slideType,
  slideData,
  animationTrigger,
  className = "",
  children,
  titleClassName = "",
  descriptionClassName = "",
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
      <motion.h1
        className={cn(
          "text-4xl md:text-6xl font-bold mb-6 text-foreground",
          titleClassName
        )}
        variants={titleVariants}
      >
        {slideData.title}
      </motion.h1>

      <motion.p
        className={cn(
          "text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed",
          descriptionClassName
        )}
        variants={descriptionVariants}
      >
        {slideData.description}
      </motion.p>

      {children && (
        <motion.div className="mt-8" variants={descriptionVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedSlide;
