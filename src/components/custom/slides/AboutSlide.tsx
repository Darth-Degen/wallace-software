import { FC } from "react";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";

interface AboutSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
}

const AboutSlide: FC<AboutSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="about"
      slideData={slideData.about}
      animationTrigger={animationTrigger}
      className={className}
      titleClassName="text-green-600 dark:text-green-400"
    />
  );
};

export default AboutSlide;
