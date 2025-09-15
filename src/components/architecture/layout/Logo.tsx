"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <div className="my-0 flex items-center gap-2 cursor-pointer">
      <Link href="/" className="font-calistoga text-2xl md:text-3xl">
        W
      </Link>
    </div>
  );
};
export default Logo;
