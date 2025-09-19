import { FC } from "react";
import { cn } from "@utils";

interface PortfolioSlideProps {
  className?: string;
}

const PortfolioSlide: FC<PortfolioSlideProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    ></div>
  );
};

export default PortfolioSlide;
