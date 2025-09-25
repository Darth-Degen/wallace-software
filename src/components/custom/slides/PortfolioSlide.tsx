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
      <div className="bg-accent p-10 rounded-lg space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Portfolio</h1>{" "}
        <p className="text-lg md:text-xl max-w-3xl">
          Over the years, I&apos;ve had the privilege of working with a diverse
          range of clients, from innovative startups to established enterprises{" "}
        </p>
      </div>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
