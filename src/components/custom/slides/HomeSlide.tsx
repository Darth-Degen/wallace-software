import { FC } from "react";
import { cn } from "@utils";

interface HomeSlideProps {
  className?: string;
}

const HomeSlide: FC<HomeSlideProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    ></div>
  );
};

export default HomeSlide;
