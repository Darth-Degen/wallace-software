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
        <AnimatedChild delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            Skills & Technologies
          </h1>
        </AnimatedChild>

        <AnimatedChild delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Technical expertise across frontend, backend, and modern development
            tools
          </p>
        </AnimatedChild>

        {/* Skills Grid */}
        <AnimatedChild delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl">
            {/* Frontend */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-muted-foreground">
                React, Next.js, TypeScript
              </p>
            </div>

            {/* Backend */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-muted-foreground">
                Node.js, Express, APIs
              </p>
            </div>

            {/* Database */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="font-semibold mb-2">Database</h3>
              <p className="text-sm text-muted-foreground">
                PostgreSQL, MongoDB
              </p>
            </div>

            {/* Tools */}
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="font-semibold mb-2">Tools</h3>
              <p className="text-sm text-muted-foreground">Git, Docker, AWS</p>
            </div>
          </div>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default SkillsSlide;
