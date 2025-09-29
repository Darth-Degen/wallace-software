import { FC } from "react";
import Image from "next/image";
import { AnimatedSlide, AnimatedChild } from "@components";
import { useLoadingStore, useViewStore } from "@stores";
//graphics
import introGraphic from "public/images/intro-graphic-xl.jpg";

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
  const { setAsset } = useLoadingStore();
  const { showView } = useViewStore();

  return (
    <>
      {/* Slide Content */}
      <AnimatedSlide
        animationTrigger={animationTrigger}
        direction={direction}
        className={className}
        ready={showView}
      >
        {/* BG Graphic */}
        <AnimatedChild animation={"fade"} className="z-0">
          <Image
            src={introGraphic}
            alt="Intro Graphic"
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setAsset("home:bg", true)}
            priority
            className="z-0 inset-x-0"
          />
          <div className="absolute inset-0 bg-black/40" />
        </AnimatedChild>
        {/* Speech Bubble */}
        <AnimatedChild
          animation={"fade"}
          delay={0.2}
          className="col-centered gap-6 relative z-10 w-[90%] h-[300px] md:w-[585px] md:aspect-[585/289] rounded-xl mb-[5%] bg-[#46658E]/80 md:bg-[#ff805c]/90 "
        >
          <AnimatedChild
            animation={"scale"}
            delay={0.4}
            className="relative z-0"
          >
            <h1 className="text-4xl font-semibold text-white/80">
              Hi, I&apos;m Wallace
            </h1>
          </AnimatedChild>
          <AnimatedChild
            animation={"scale"}
            delay={0.6}
            className="relative z-0  max-w-[400px]"
          >
            <p className="text-lg md:text-xl text-white/70 max-w-xl">
              A front end developer who loves crafting unique digital
              experiences. I specialize in using Next.JS, Typescript, Tailwind,
              and Motion.
            </p>
          </AnimatedChild>
        </AnimatedChild>
      </AnimatedSlide>
    </>
  );
};

export default AboutSlide;
