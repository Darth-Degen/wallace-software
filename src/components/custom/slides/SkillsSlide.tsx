import { FC } from "react";
import { cn } from "@utils";

interface SkillsSlideProps {
  className?: string;
}

const SkillsSlide: FC<SkillsSlideProps> = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
    ></div>
  );
};

export default SkillsSlide;
