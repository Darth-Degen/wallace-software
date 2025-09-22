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
        <AnimatedChild delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-600 dark:text-green-400">
            About Me
          </h1>
        </AnimatedChild>

        <AnimatedChild delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Passionate developer with expertise in full-stack development and
            user experience design
          </p>
        </AnimatedChild>

        {/* Skills & Interests */}
        <AnimatedChild delay={0.2}>
          <div className="grid grid-cols-2 gap-8 mt-12 max-w-2xl">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                Technical Skills
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• React & Next.js</li>
                <li>• TypeScript & JavaScript</li>
                <li>• Node.js & Express</li>
                <li>• Database Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                Focus Areas
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• User Experience</li>
                <li>• Performance Optimization</li>
                <li>• Accessibility</li>
                <li>• Modern Architecture</li>
              </ul>
            </div>
          </div>
        </AnimatedChild>

        {/* CTA */}
        <AnimatedChild delay={0.3}>
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Let's Work Together
          </button>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default AboutSlide;
