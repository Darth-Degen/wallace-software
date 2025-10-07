import { FC } from "react";
import { AnimatedChild, AnimatedSlide, PortfolioCard } from "@components";
import { useCarousel } from "@stores";
import { PORTFOLIO_ITEMS } from "@constants";

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
  const {
    currentSlide,
    setFooterSlide,
    footerToCarouselMap,
    getCarouselPages,
  } = useCarousel();

  // Current slide path (for portfolio grouping)
  const currentPath = getCarouselPages()[currentSlide]?.path || "";
  const portfolioActive = currentPath.includes("#portfolio-");

  const portfolioIndex = PORTFOLIO_ITEMS.findIndex((item) =>
    currentPath.includes(item.title.toLowerCase().replace(" ", ""))
  );

  return (
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild
        animation="fade"
        className="z-0 max-w-6xl w-full flex flex-wrap items-center justify-center gap-6 sm:px-16 md:px-32 lg:px-0"
      >
        {portfolioIndex !== -1 && (
          <PortfolioCard
            item={PORTFOLIO_ITEMS[portfolioIndex]}
            className="!w-[900px] 2xl:!w-[1200px]"
          />
        )}
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default PortfolioSlide;
