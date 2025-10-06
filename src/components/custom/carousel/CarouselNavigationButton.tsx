import { cn } from "@utils";
import { FC } from "react";

interface CarouselNavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const CarouselNavigationButton: FC<CarouselNavigationButtonProps> = ({
  direction,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "transition-200 hover:lg:scale-110 active:scale-75 active:lg:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-min",
        className
      )}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "size-[clamp(64px,8vw,72px)]", // smaller on mobile, up to 72px on large screens
          direction === "right" ? "rotate-180" : ""
        )}
      >
        <path
          d="M0 36C0 16.1178 16.1178 0 36 0C55.8823 0 72 16.1178 72 36C72 55.8823 55.8823 72 36 72C16.1178 72 0 55.8823 0 36Z"
          fill="currentColor"
          className="transition-colors duration-1000 delay-300 text-accent"
        />
        <g opacity="0.62" clipPath="url(#clip0_41_3855)">
          <path
            d="M24.0373 33.0782C24.1833 32.9284 24.7344 32.2878 25.2478 31.7607C28.2577 28.4463 36.1096 23.0213 40.2193 21.3654C40.8434 21.0993 42.4214 20.5362 43.2645 20.5C44.0723 20.5 44.8424 20.686 45.5772 21.0632C46.4933 21.5902 47.2282 22.4194 47.6308 23.3985C47.89 24.0779 48.2927 26.111 48.2927 26.1472C48.6954 28.3714 48.9168 31.9855 48.9168 35.9793C48.9168 39.7846 48.6954 43.2514 48.3657 45.5092C48.3279 45.5454 47.9253 48.0719 47.4849 48.9373C46.677 50.5183 45.0991 51.5 43.4104 51.5H43.2645C42.1647 51.4612 39.8519 50.4796 39.8519 50.4434C35.9637 48.7849 28.2929 43.626 25.2101 40.1979C25.2101 40.1979 24.3418 39.317 23.9643 38.7668C23.3754 37.9762 23.0835 36.9972 23.0835 36.0181C23.0835 34.9253 23.4132 33.9075 24.0373 33.0782Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_41_3855">
            <rect
              width="62"
              height="62"
              fill="white"
              transform="translate(5 5)"
            />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default CarouselNavigationButton;
