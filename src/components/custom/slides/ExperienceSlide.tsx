import { FC } from "react";
import { AnimatedSlide, AnimatedChild, ExperienceCard } from "@components";

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
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild animation="fade" className="z-0 max-w-6xl w-full">
        <div className="mx-auto text-center mb-10">
          <AnimatedChild animation={"fade"} delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold">Experience</h1>
          </AnimatedChild>
          <AnimatedChild animation={"fade"} delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground mt-3">
              10+ years building frontend experiences for startups and Web3
            </p>
          </AnimatedChild>
        </div>

        <div className="grid gap-6 md:gap-7 lg:grid-cols-3 px-10 sm:px-16 md:px-32 lg:px-0">
          <ExperienceCard
            range="2022-Present"
            title="Co-Founder, Sandbox Studio"
            bullets={[
              "Crafted high-performance websites for Web2/Web3 clients using Next.js, React, Tailwind, and Framer Motion.",
              "Led frontend architecture and component libraries for multiple brands.",
              "Partnered with stakeholders to scope features and deliver on tight timelines.",
            ]}
          />
          <ExperienceCard
            range="2022"
            title="Senior Frontend Developer, De Labs"
            bullets={[
              "Built performant UI flows and internal tools.",
              "Collaborated on design systems and accessibility.",
              "Improved bundle size and rendering performance.",
            ]}
          />
          <ExperienceCard
            range="2014-2021"
            title="Mobile Developer, Streamline VRS"
            bullets={[
              "Shipped production React/React Native apps.",
              "Integrated complex APIs and auth flows.",
              "Owned CI/CD and release automation.",
            ]}
          />
        </div>
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default ExperienceSlide;
