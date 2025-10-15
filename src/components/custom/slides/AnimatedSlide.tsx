import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@utils";

interface AnimatedSlideProps {
  animationTrigger: "pageLoad" | "slideTransition";
  direction?: 1 | -1; // 1 for right/next, -1 for left/previous
  className?: string;
  children: ReactNode;
  ready?: boolean; //used to delay children if needed
  noExit?: boolean; // skip exit animation
}

const AnimatedSlide: FC<AnimatedSlideProps> = ({
  animationTrigger,
  direction = 1,
  className = "",
  ready = true,
  children,
  noExit = false,
}) => {
  // Simple page load animation - fade in
  const pageLoadVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  } as const;

  // Simple slide transition - slide left/right
  const slideTransitionVariants = {
    initial: {
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Enter from right if going forward, left if going back
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -100 : 100, // Exit to left if going forward, right if going back
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        when: "afterChildren",
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
  } as const;

  const variants =
    animationTrigger === "pageLoad"
      ? pageLoadVariants
      : slideTransitionVariants;

  return (
    <motion.div
      className={cn(
        "w-full h-full flex flex-col flex-grow items-center justify-center text-center",
        className
      )}
      variants={variants}
      initial="initial"
      animate={ready ? "animate" : "initial"}
      exit={noExit ? undefined : "exit"}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSlide;
