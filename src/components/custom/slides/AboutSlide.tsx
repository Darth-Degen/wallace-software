import { FC } from "react";
import Image from "next/image";
import { AnimatedSlide, AnimatedChild } from "@components";
import { useLoadingStore, useViewStore } from "@stores";
import { useWindowSize } from "@hooks";
import introGraphic from "public/images/intro-graphic-xl.jpg";
import mobileIntroGraphic from "public/images/mobile-intro-graphic.jpg";
import { handleCopyEmail } from "@utils";

interface AboutSlideProps {
  className?: string;
  direction?: 1 | -1;
}

const AboutSlide: FC<AboutSlideProps> = ({ className = "", direction = 1 }) => {
  const { setAsset } = useLoadingStore();
  const { showView } = useViewStore();
  const [winWidth] = useWindowSize();

  const delay = 0.25;

  return (
    <AnimatedSlide
      animationTrigger="pageLoad"
      direction={direction}
      className={className}
      ready={showView}
    >
      {/* Background */}
      <AnimatedChild animation="fade" className="fixed inset-0 z-0">
        <Image
          src={winWidth > 1024 ? introGraphic : mobileIntroGraphic}
          alt="Studio backdrop"
          fill
          className="object-cover"
          onLoad={() => setAsset("home:bg", true)}
          priority
        />
        <div className="fixed inset-0 bg-black/10 md:bg-black/10" />
      </AnimatedChild>
      {/* Content */}
      <section
        id="intro"
        className="relative z-10 mx-auto px-6 md:px-8 py-10 max-w-6xl text-start"
        aria-labelledby="hero-title"
      >
        {/* SEO/accessible H1 (hidden visually) */}
        <h1 className="sr-only">
          React & Next.js Frontend Engineer building fast, accessible web apps —
          Wallace Software
        </h1>
        <div
          className="
            grid gap-6 lg:gap-8
            lg:grid-cols-2
          "
        >
          {/* Left: hero card */}
          <AnimatedChild
            animation="scale"
            delay={delay}
            className="
    flex flex-col gap-8  
    rounded-3xl bg-white/55 md:bg-white/65 backdrop-blur
    shadow-lg ring-1 ring-black/5
    text-gray-800 p-7 md:p-9
  "
          >
            <h2
              id="hero-title"
              className="text-2xl md:text-4xl font-bold tracking-tight text-start"
            >
              Hi, I&apos;m Wallace
            </h2>

            <p className="text-base md:text-xl text-gray-700 max-w-prose leading-relaxed font-medium">
              A senior frontend developer who enjoys taking ownership of his
              work and translating designs into thoughtful, well-crafted
              experiences.
            </p>

            <p className="text-base md:text-xl text-gray-700 max-w-prose leading-relaxed font-medium">
              My go-to stack is{" "}
              <span className="font-bold">Next.js, TypeScript,</span> and{" "}
              <span className="font-bold">Tailwind CSS</span>. It&apos;s where
              I&apos;ve spent most of my time building production websites, many
              of which you can find in the portfolio tab in the footer.
            </p>

            <div className="space-y-1 mt-2 text-base md:text-lg">
              <p className="text-gray-700 max-w-prose leading-relaxed font-medium">
                Check out my{" "}
                <a
                  href="https://www.linkedin.com/in/wallace-palmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  LinkedIn
                </a>
              </p>
              <p className="text-gray-700 max-w-prose leading-relaxed font-medium">
                Or my work on{" "}
                <a
                  href="https://github.com/wallace-software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  GitHub
                </a>
              </p>
            </div>
          </AnimatedChild>

          {/* Right: details card */}
          <AnimatedChild
            animation="scale"
            delay={delay * 2}
            className="
    rounded-3xl bg-white/55 backdrop-blur
    shadow-lg ring-1 ring-black/5
    text-gray-800 p-7 md:p-9
  "
          >
            <div className="space-y-2 text-gray-700 leading-relaxed max-w-prose">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Experience
              </p>
              <p>
                I&apos;ve spent over ten years building interfaces across
                startups and small teams. Working on both early products and
                mature systems has shaped how I approach frontend challenges,
                knowing when to move fast or slow down and refine the details.
              </p>
              <p>
                My background spans both mobile and web, sharpening my intuition
                around responsiveness and performance.
              </p>

              <p className="text-xs uppercase tracking-wider text-gray-500 pt-3">
                Beyond Work
              </p>
              <p>
                I lived in six different countries growing up which taught me
                how to adapt quickly and communicate well with others.
              </p>
              <p>
                Outside of work, I like to challenge both my body and mind. I
                stay active in the gym, spend time outdoors, and enjoy exploring
                new hobbies like yoga and pickleball.
              </p>

              {/* CTA row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleCopyEmail()}
                  className="
          rounded-full px-5 py-2 text-sm font-medium 
          bg-gray-900/70 text-white hover:bg-gray-900/80
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
          transition-200 hover:scale-105 active:scale-95
        "
                  aria-label="Copy my email address"
                >
                  Copy Email
                </button>
                <a
                  href="mailto:wallace@wallace.software"
                  className="
          rounded-full px-5 py-2 text-sm font-medium
          bg-white/70 hover:bg-white/80 text-gray-900 ring-1 ring-gray-300  
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
          transition-200 hover:scale-105 active:scale-95
        "
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </AnimatedChild>
        </div>
      </section>
    </AnimatedSlide>
  );
};

export default AboutSlide;
