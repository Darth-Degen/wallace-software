import { FC } from "react";
import { Laptop, ClipboardList } from "lucide-react";
import { SkillsCard, AnimatedChild, AnimatedSlide } from "@components";

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
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild animation="fade" className="z-0 max-w-6xl w-full">
        <div className="mx-auto text-center mb-10">
          <AnimatedChild animation={"fade"} delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold">Portfolio</h1>
          </AnimatedChild>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 px-10 sm:px-16 md:px-32 lg:px-0"></div>
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
