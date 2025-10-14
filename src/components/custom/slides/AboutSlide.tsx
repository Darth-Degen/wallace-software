import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSlide, AnimatedChild } from "@components";
import { useLoadingStore, useViewStore } from "@stores";
import { useWindowSize } from "@hooks";
import introGraphic from "public/images/intro-graphic-xl.jpg";
import mobileIntroGraphic from "public/images/mobile-intro-graphic.jpg";
import { handleCopyEmail } from "@utils";

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

  const delay = 0.25;

  return (
    <AnimatedSlide
      animationTrigger="pageLoad"
      direction={direction}
      className={className}
      ready={showView}
    >
      {/* Background */}
      <AnimatedChild animation="fade" className="z-0">
        <div className="absolute inset-0">
          <Image
            src={winWidth > 1024 ? introGraphic : mobileIntroGraphic}
            alt="Studio backdrop"
            fill
            className="object-cover"
            onLoad={() => setAsset("home:bg", true)}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </AnimatedChild>

      {/* Content */}
      <section
        id="intro"
        className="relative z-10 mx-auto px-6 md:px-8 max-w-6xl  text-start"
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
              rounded-3xl bg-white/65 backdrop-blur
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

            <p className="mt-4 text-base md:text-xl text-gray-700 max-w-prose leading-relaxed font-medium">
              A senior frontend developer who specializes in building websites
              that are responsive, fast, and crafted with exceptional attention
              to detail. I work primarily with
              <span className="font-semibold"> Next.js, TypeScript,</span> and
              <span className="font-semibold"> Tailwind CSS</span>, focusing on
              clean, maintainable code that turns thoughtful designs into
              smooth, user-friendly experiences.
            </p>
            <div className="space-y-1 text-base md:text-lg">
              <p className="text-gray-700 max-w-prose leading-relaxed font-medium">
                Check out my{" "}
                <a
                  href="https://www.linkedin.com/in/wallace-palmer-4b93473a"
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
                  href="https://github.com/Darth-Degen"
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
                With over ten years of development experience, I&apos;ve worked
                across startups, Web3 companies, and creative brands to deliver
                high-quality frontend solutions. My background spans mobile and
                web, which gives me a strong sense for performance, usability,
                and how to craft interfaces that connect with users.
              </p>

              <p className="text-xs uppercase tracking-wider text-gray-500 pt-3">
                Beyond Work
              </p>
              <p>
                A fun fact about me is that I lived in six countries before
                turning eighteen. Those experiences taught me to adapt quickly,
                stay curious, and appreciate the uniqueness in everyday life.
                It&apos;s a mindset I bring to my work, where I&apos;m always
                learning, experimenting, and finding creative solutions.
              </p>

              {/* CTA row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleCopyEmail()}
                  className="
                    rounded-full px-5 py-2 text-sm font-medium
                    bg-gray-900 text-white hover:bg-gray-800
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
                  "
                  aria-label="Copy my email address"
                >
                  Copy Email
                </button>
                <a
                  href="mailto:info@wallace.software"
                  className="
                    rounded-full px-5 py-2 text-sm font-medium
                    bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900
                  "
                >
                  Email Me
                </a>
              </div>
            </div>
          </AnimatedChild>

          {/* Quick links */}
          {/* <AnimatedChild
            animation="scale"
            delay={delay * 3}
            className="
              lg:col-span-2
              rounded-3xl bg-white/85 backdrop-blur
              shadow-lg ring-1 ring-black/5 text-gray-800 p-5
            "
          >
            <nav aria-label="Quick links" className="flex flex-wrap gap-4">
              <Link
                href="/#about"
                className="underline underline-offset-2 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                About
              </Link>
              <Link
                href="/#experience"
                className="underline underline-offset-2 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Experience
              </Link>
              <Link
                href="/#skills"
                className="underline underline-offset-2 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Skills
              </Link>
              <Link
                href="/#portfolio-somosaxolotl"
                className="underline underline-offset-2 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Portfolio
              </Link>
            </nav>
          </AnimatedChild> */}
        </div>
      </section>
    </AnimatedSlide>
  );
};

export default AboutSlide;
