import { FC } from "react";
import { cn } from "@utils";

interface AboutSlideProps {
  className?: string;
}

const AboutSlide: FC<AboutSlideProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    ></div>
  );
};

export default AboutSlide;
