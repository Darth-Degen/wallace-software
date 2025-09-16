"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useColorTheme } from "@stores";

const Logo: FC = () => {
  const { cycleAccentColor } = useColorTheme();

  return (
    <div className="my-0 flex items-center gap-2 cursor-pointer">
      <Link
        href="/"
        className="hover-text-accent font-calistoga text-2xl md:text-3xl"
        onClick={cycleAccentColor}
      >
        W {/* <span className="hidden lg:inline">allace</span> */}
      </Link>
    </div>
  );
};
export default Logo;
