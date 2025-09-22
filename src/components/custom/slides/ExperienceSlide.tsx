import { FC } from "react";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";

interface ExperienceSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
}

const ExperienceSlide: FC<ExperienceSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="experience"
      slideData={slideData.experience}
      animationTrigger={animationTrigger}
      className={className}
      titleClassName="text-orange-600 dark:text-orange-400"
    />
  );
};

export default ExperienceSlide;
