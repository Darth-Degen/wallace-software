import { FC } from "react";
import { motion } from "framer-motion";
import { slideData } from "@constants";
import AnimatedSlide from "./AnimatedSlide";
import AnimatedChild from "./AnimatedChild";

interface ExampleSlideUsageProps {
  animationTrigger?: "pageLoad" | "slideTransition";
}

const ExampleSlideUsage: FC<ExampleSlideUsageProps> = ({
  animationTrigger = "pageLoad",
}) => {
  return (
    <AnimatedSlide
      slideType="home"
      slideData={slideData.home}
      animationTrigger={animationTrigger}
      titleClassName="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    >
      {/* Children will automatically be part of the animation sequence */}

      {/* Method 1: Simple div - will use the children animation variants */}
      <div className="mt-6 space-y-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <p className="text-sm text-muted-foreground">
          This content animates as part of the sequence
        </p>
      </div>

      {/* Method 2: Using AnimatedChild for more control */}
      <div className="mt-8 space-y-4">
        <AnimatedChild direction="up" delay={0.1}>
          <div className="flex gap-4 justify-center">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Contact
            </button>
          </div>
        </AnimatedChild>

        <AnimatedChild direction="scale" delay={0.2}>
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-8 h-8 bg-blue-500 rounded mb-2"></div>
              <p className="text-xs">Feature 1</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-8 h-8 bg-purple-500 rounded mb-2"></div>
              <p className="text-xs">Feature 2</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="w-8 h-8 bg-green-500 rounded mb-2"></div>
              <p className="text-xs">Feature 3</p>
            </div>
          </div>
        </AnimatedChild>

        <AnimatedChild direction="fade" delay={0.3}>
          <motion.p
            className="text-xs text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✨ All animations respect the sequence timing
          </motion.p>
        </AnimatedChild>
      </div>
    </AnimatedSlide>
  );
};

export default ExampleSlideUsage;
