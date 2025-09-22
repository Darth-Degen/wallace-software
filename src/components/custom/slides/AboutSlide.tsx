import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface AboutSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const AboutSlide: FC<AboutSlideProps> = ({
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
      {/* About Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
        </AnimatedChild>

        {/* CTA */}
        <AnimatedChild delay={0.3}>
          <button className="px-8 py-3">Let&apos;s Work Together</button>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default AboutSlide;
