import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface ExperienceSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const ExperienceSlide: FC<ExperienceSlideProps> = ({
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
      {/* Experience Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Experience</h1>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default ExperienceSlide;
