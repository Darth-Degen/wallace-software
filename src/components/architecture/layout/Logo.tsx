"use client";
import { FC } from "react";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <div className="my-0 flex items-center gap-2 cursor-pointer">
      <Link
        href="/"
        className="hover-text-accent font-calistoga text-2xl md:text-3xl"
      >
        W {/* <span className="hidden lg:inline">allace</span> */}
      </Link>
    </div>
  );
};
export default Logo;
