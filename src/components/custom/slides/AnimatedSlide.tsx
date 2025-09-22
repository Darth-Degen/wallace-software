import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@utils";

interface AnimatedSlideProps {
  animationTrigger: "pageLoad" | "slideTransition";
  direction?: 1 | -1; // 1 for right/next, -1 for left/previous
  className?: string;
  children: ReactNode;
}

const AnimatedSlide: FC<AnimatedSlideProps> = ({
  animationTrigger,
  direction = 1,
  className = "",
  children,
}) => {
  // Simple page load animation - fade in
  const pageLoadVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  // Simple slide transition - slide left/right
  const slideTransitionVariants = {
    initial: {
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Enter from right if going forward, left if going back
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -100 : 100, // Exit to left if going forward, right if going back
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
  };

  const variants =
    animationTrigger === "pageLoad"
      ? pageLoadVariants
      : slideTransitionVariants;

  return (
    <motion.div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center text-center px-6",
        className
      )}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSlide;
