import { FC, ReactNode } from "react";
import { hover, motion, Variants } from "framer-motion";
import { cn } from "@utils";

interface AnimatedChildProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "up" | "down" | "left" | "right" | "scale" | "fade";
  disableAnimation?: boolean;
  hover?: boolean; // slight scale on hover
}

const AnimatedChild: FC<AnimatedChildProps> = ({
  children,
  className = "",
  delay,
  animation = "fade",
  disableAnimation = false,
  hover = false,
}) => {
  const hoverEffect = hover ? { scale: 1.2 } : {};
  const childAnimationVariants = {
    up: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, hover: hoverEffect },
      exit: { opacity: 0, y: -10 },
    },
    down: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, hover: hoverEffect },
      exit: { opacity: 0, y: 10 },
    },
    left: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0, hover: hoverEffect },
      exit: { opacity: 0, x: -10 },
    },
    right: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0, hover: hoverEffect },
      exit: { opacity: 0, x: 10 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1, hover: hoverEffect },
      exit: { opacity: 0, scale: 0.98 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, hover: hoverEffect },
      exit: { opacity: 0 },
    },
  } as const;

  const variants: Variants = {
    initial: childAnimationVariants[animation].initial,
    animate: {
      ...childAnimationVariants[animation].animate,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay || 0,
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

  if (disableAnimation) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
};

export default AnimatedChild;
