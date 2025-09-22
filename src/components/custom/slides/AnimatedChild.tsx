import { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@utils";

interface AnimatedChildProps {
  children: ReactNode;
  className?: string;
  delay?: number; // kept for backward compatibility; parent stagger controls timing
  animation?: "up" | "down" | "left" | "right" | "scale" | "fade";
}

const childAnimationVariants = {
  up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  down: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
  left: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
  right: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const;

const AnimatedChild: FC<AnimatedChildProps> = ({
  children,
  className = "",
  // delay intentionally unused so parent can control staggering
  delay,
  animation = "scale",
}) => {
  const variants: Variants = {
    initial: childAnimationVariants[animation].initial,
    animate: {
      ...childAnimationVariants[animation].animate,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      ...childAnimationVariants[animation].exit,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
};

export default AnimatedChild;
