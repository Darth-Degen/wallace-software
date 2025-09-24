import { FC } from "react";
import { AnimatedSlide, AnimatedChild } from "@components";
import Image from "next/image";
import { useLoadingStore, useViewStore } from "@stores";

//graphics
import introGraphic from "public/images/intro-graphic-xl.jpg";
import speechBubble from "public/images/speech-bubble.svg";
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
  const { showView } = useViewStore();

  // if (!showView) return null;

  return (
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
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/40" />
      </AnimatedChild>
      {/* Speech Bubble */}
      <AnimatedChild className="col-centered gap-6 relative z-10 w-[585px] aspect-[585/289] rounded-md bg-accent">
        <AnimatedChild animation={"scale"} className="relative z-0">
          <h1 className="text-4xl font-semibold text-foreground">
            Hi, I&apos;m Wallace
          </h1>
        </AnimatedChild>
        <AnimatedChild
          animation={"scale"}
          className="relative z-0  max-w-[400px]"
        >
          <p className="text-lg md:text-xl text-foreground max-w-xl">
            A front end developer who loves crafting unique digital experiences.
            I specialize in using Next.JS, Typescript, Tailwind, and Motion.
          </p>
        </AnimatedChild>
      </AnimatedChild>
    </AnimatedSlide>
  );
};
{
  /* <AnimatedChild animation={"scale"} className="z-0">
          <Image
            src={speechBubble}
            alt="Speech Bubble"
            fill
            sizes="(max-width: 768px) 90vw, 585px"
            objectFit="contain"
            onLoadingComplete={() => setAsset("home:speech", true)}
            priority
            className="absolute inset-0 z-0"
          />
        </AnimatedChild> */
}

{
  /* CSS speech bubble: rounded rectangle background + rotated square tail for instant paint */
}
{
  /* <div
            aria-hidden
            className="absolute inset-0 rounded-[24px] bg-[#FF805C]"
          />
          <div
            aria-hidden
            className="absolute -bottom-6 right-20 h-10 w-10 bg-[#FF805C] rotate-45"
          /> */
}
export default HomeSlide;
