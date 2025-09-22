import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface PortfolioSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const PortfolioSlide: FC<PortfolioSlideProps> = ({
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
      {/* Portfolio Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Portfolio</h1>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
