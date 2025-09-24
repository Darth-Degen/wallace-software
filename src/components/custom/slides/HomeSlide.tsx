import { FC, useState } from "react";
import { AnimatedSlide, AnimatedChild, SplashScreen } from "@components";
import Image from "next/image";
import introGraphic from "public/images/intro-graphic-xl.jpg";

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
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <>
      <AnimatedSlide
        animationTrigger={animationTrigger}
        direction={direction}
        className={className}
      >
        {/* Hero Content */}
        <AnimatedChild animation={"fade"}>
          <Image
            src={introGraphic}
            alt="Intro Graphic"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setBgLoaded(true)}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/40 z-[5]" />
        </AnimatedChild>
        {animationTrigger === "pageLoad" && (
          <SplashScreen assets={[bgLoaded]} minDurationMs={17500} />
        )}
      </AnimatedSlide>
    </>
  );
};

export default HomeSlide;
