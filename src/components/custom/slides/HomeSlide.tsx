import { FC, useState } from "react";
import { AnimatedSlide, AnimatedChild, SplashScreen } from "@components";
import Image from "next/image";
import introGraphic from "public/images/intro-graphic.jpg";

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
    <div className="w-full h-full">
      <AnimatedSlide
        animationTrigger={animationTrigger}
        direction={direction}
        className={className}
      >
        {/* Hero Content */}
        <div className="w-screen h-full flex flex-grow">
          <Image
            src={introGraphic}
            alt="Intro Graphic"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setBgLoaded(true)}
            className=""
          />
          {/* <AnimatedChild animation={"fade"}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
              Welcome to Wallace Software
            </h1>
          </AnimatedChild> */}
        </div>
      </AnimatedSlide>
      {/* <SplashScreen assets={[bgLoaded]} minDurationMs={750} /> */}
    </div>
  );
};

export default HomeSlide;
