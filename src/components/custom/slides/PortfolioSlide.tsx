import { FC } from "react";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";

interface PortfolioSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
}

const PortfolioSlide: FC<PortfolioSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="portfolio"
      slideData={slideData.portfolio}
      animationTrigger={animationTrigger}
      className={className}
      titleClassName="text-indigo-600 dark:text-indigo-400"
    />
  );
};

export default PortfolioSlide;
