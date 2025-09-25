"use client";
import { useCarousel } from "@stores";
import { FC } from "react";

const Logo: FC = () => {
  const { currentSlide, setSlide } = useCarousel();
  return (
    <div
      className="my-0 flex items-center gap-2 cursor-pointer"
      onClick={() => setSlide(0)}
    >
      <p className="hover-text-accent font-calistoga text-2xl md:text-3xl">
        W<span className="hidden 2xl:inline">allace</span>
      </p>
    </div>
  );
};
export default Logo;
