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
        <AnimatedChild delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
            Portfolio
          </h1>
        </AnimatedChild>

        <AnimatedChild delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Showcase of projects that demonstrate creativity, technical skill,
            and problem-solving
          </p>
        </AnimatedChild>

        {/* Project Grid */}
        <AnimatedChild delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl">
            {/* Project 1 */}
            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="w-full h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                E-Commerce Platform
              </h3>
              <p className="text-muted-foreground mb-4">
                Full-stack e-commerce solution with React, Node.js, and Stripe
                integration.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  React
                </span>
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  Stripe
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Responsive dashboard with real-time data visualization and
                mobile-first design.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  Chart.js
                </span>
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                  PWA
                </span>
              </div>
            </div>
          </div>
        </AnimatedChild>

        {/* CTA */}
        <AnimatedChild delay={0.3}>
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            View All Projects
          </button>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
