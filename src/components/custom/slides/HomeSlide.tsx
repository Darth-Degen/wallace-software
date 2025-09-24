import { FC, useState } from "react";
import { AnimatedSlide, AnimatedChild, SplashScreen } from "@components";
import Image from "next/image";
import introGraphic from "public/images/intro-graphic-xl.jpg";
import { useLoadingStore } from "@stores";

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
  const { setAsset } = useLoadingStore();

  return (
    <AnimatedSlide
      animationTrigger={animationTrigger}
      direction={direction}
      className={className}
    >
      <AnimatedChild animation={"fade"}>
        <Image
          src={introGraphic}
          alt="Intro Graphic"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setAsset("home:bg", true)}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-[5]" />
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default HomeSlide;
