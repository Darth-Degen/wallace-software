import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface HomeSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const HomeSlide: FC<HomeSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
  direction = 1,
}) => {
  return (
    <AnimatedSlide
      animationTrigger={animationTrigger}
      direction={direction}
      className={className}
    >
      {/* Hero Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild animation={"fade"}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
            Welcome to Wallace Software
          </h1>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default HomeSlide;
