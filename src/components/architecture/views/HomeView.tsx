"use client";

import { FC } from "react";
import { SimpleCarousel } from "@components";

const HomeView: FC = () => {
  return (
    <div className="w-full h-full">
      <SimpleCarousel className="h-full" />
    </div>
  );
};

export default HomeView;
