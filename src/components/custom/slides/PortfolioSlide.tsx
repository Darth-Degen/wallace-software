import { FC } from "react";
import { AnimatedChild, AnimatedSlide, PortfolioCard } from "@components";

export interface PortfolioItem {
  title: string;
  videoId: string;
  description?: string;
  projectUrl: string;
  githubUrl?: string;
  skills?: string[];
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: " Scum",
    videoId: "dd20e765bdeb6307d8b0c1a1399c8b83", // Replace with actual video ID
    description:
      "A satirical take on personal portfolios, showcasing a playful and unconventional design.",
    projectUrl: "https://scum.art",
    githubUrl: "https://github.com/portfolio-scum",
    skills: ["React", "TypeScript", "CSS"],
  },
];

interface PortfolioSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const PortfolioSlide: FC<PortfolioSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
  direction = 1,
}) => {
  return (
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild
        animation="fade"
        className="z-0 max-w-6xl w-full flex flex-wrap items-center justify-center gap-6 px-10 sm:px-16 md:px-32 lg:px-0"
      >
        <PortfolioCard header="Scum" className="!max-w-[1000px] w-[800px]" />
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
