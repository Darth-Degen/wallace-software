import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface SkillsSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const SkillsSlide: FC<SkillsSlideProps> = ({
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
      {/* Skills Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Skills & Technologies
          </h1>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default SkillsSlide;
