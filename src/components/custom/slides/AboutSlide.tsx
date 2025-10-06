import { FC } from "react";
import Image from "next/image";
import { AnimatedSlide, AnimatedChild } from "@components";
import { useLoadingStore, useViewStore } from "@stores";
import { useWindowSize } from "@hooks";
//graphics
import introGraphic from "public/images/intro-graphic-xl.jpg";
import mobileIntroGraphic from "public/images/mobile-intro-graphic.jpg";

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
  const [winWidth] = useWindowSize();

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
            src={winWidth > 1024 ? introGraphic : mobileIntroGraphic}
            alt="Intro Graphic"
            layout="fill"
            objectFit="cover"
            onLoad={() => setAsset("home:bg", true)}
            priority
            className="z-0 inset-x-0"
          />
          <div className="absolute inset-0 bg-black/40" />
        </AnimatedChild>
        {/* Speech Bubble */}
        <AnimatedChild
          animation={"fade"}
          // hover={true}
          delay={0.2}
          className="flex flex-col justify-center gap-6 relative z-10 w-[90%] h-auto md:max-w-[500px]  rounded-xl lg:mb-[5%] mt-10 bg-[#ff805c]/85 md:bg-[#ff805c]/90 py-6 lg:pt-10 lg:pb-16 px-4 md:px-8"
        >
          <AnimatedChild animation={"scale"} delay={0.4}>
            <h1 className="text-2xl md:text-4xl font-semibold text-white/90 text-center">
              Hi, I&apos;m Wallace
            </h1>
          </AnimatedChild>
          <AnimatedChild
            animation={"scale"}
            delay={0.6}
            className="text-center space-y-4"
          >
            {/* <p className="text-base md:text-xl text-white/70 max-w- xl">
              A front end developer who loves crafting unique digital
              experiences. I specialize in using Next.JS, Typescript, Tailwind,
              and Motion.
            </p> */}
            <p className="text-base md:text-lg text-white/80 max-w-xl">
              A frontend developer who loves bringing elegant designs to life. I
              specialize in building fast, responsive websites with Next.js,
              TypeScript, Tailwind, and more. Click the arrows to navigate my
              work and skills.
            </p>
          </AnimatedChild>
        </AnimatedChild>
      </AnimatedSlide>
    </>
  );
};

export default AboutSlide;
