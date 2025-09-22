import { FC } from "react";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";

interface HomeSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
}

const HomeSlide: FC<HomeSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="home"
      slideData={slideData.home}
      animationTrigger={animationTrigger}
      className={className}
      titleClassName="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    />
  );
};

export default HomeSlide;
