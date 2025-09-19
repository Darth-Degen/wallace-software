import { FC } from "react";
import { cn } from "@utils";

interface ExperienceSlideProps {
  className?: string;
}

const ExperienceSlide: FC<ExperienceSlideProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    ></div>
  );
};

export default ExperienceSlide;
