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
        <AnimatedChild delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-orange-600 dark:text-orange-400">
            Experience
          </h1>
        </AnimatedChild>

        <AnimatedChild delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Professional journey through various technologies and challenging
            projects
          </p>
        </AnimatedChild>

        {/* Timeline */}
        <AnimatedChild delay={0.2}>
          <div className="space-y-6 mt-12 max-w-3xl">
            {/* Experience Item 1 */}
            <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Senior Full-Stack Developer
                </h3>
                <p className="text-orange-400 mb-3">2022 - Present</p>
                <p className="text-muted-foreground">
                  Leading development of scalable web applications using React,
                  Node.js, and cloud technologies. Mentoring junior developers
                  and architecting solutions for complex business requirements.
                </p>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="flex gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Developer
                </h3>
                <p className="text-orange-400 mb-3">2020 - 2022</p>
                <p className="text-muted-foreground">
                  Specialized in creating responsive, accessible user interfaces
                  with modern JavaScript frameworks. Collaborated with design
                  teams to implement pixel-perfect solutions.
                </p>
              </div>
            </div>
          </div>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default ExperienceSlide;
