import { FC } from "react";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";

interface SkillsSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
}

const SkillsSlide: FC<SkillsSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="skills"
      slideData={slideData.skills}
      animationTrigger={animationTrigger}
      className={className}
      titleClassName="text-purple-600 dark:text-purple-400"
    />
  );
};

export default SkillsSlide;
