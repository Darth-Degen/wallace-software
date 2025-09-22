import { FC } from "react";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface HomeSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const HomeSlide: FC<HomeSlideProps> = ({
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
      {/* Hero Content */}
      <div className="space-y-8">
        {/* Title & Description */}
        <AnimatedChild delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Wallace Software
          </h1>
        </AnimatedChild>

        <AnimatedChild delay={0.1}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Building innovative digital solutions with modern technologies and
            creative design
          </p>
        </AnimatedChild>

        {/* Action Buttons */}
        <AnimatedChild delay={0.2}>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </AnimatedChild>

        {/* Feature Cards */}
        <AnimatedChild delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Modern Design</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, responsive interfaces
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Fast Performance</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for speed and efficiency
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 mx-auto"></div>
              <h3 className="font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Built to grow with your needs
              </p>
            </div>
          </div>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default HomeSlide;
