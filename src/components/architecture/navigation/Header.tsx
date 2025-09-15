"use client";
import { FC } from "react";
import Link from "next/link";
import { GithubLink, LinkedinLink, Logo, MailLink } from "@components";
import { PAGES } from "@constants";

const Header: FC = ({}) => {
  const nav = PAGES.filter((p) => p.showInHeader);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Right controls */}
        <div className="ml-auto md:ml-2 flex items-center gap-0">
          <GithubLink />
          <LinkedinLink />
          <MailLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
