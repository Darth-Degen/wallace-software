import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@utils";

interface AnimatedChildProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedChild: FC<AnimatedChildProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  // Simple child animation that works with parent stagger
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ...(delay > 0 && { delay }) },
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
};

export default AnimatedChild;
