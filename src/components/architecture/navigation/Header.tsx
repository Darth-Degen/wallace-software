"use client";
import { FC } from "react";
import { GithubLink, LinkedinLink, Logo, MailLink } from "@components";

const Header: FC = ({}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b">
      <div className="page-padding-x mx-auto h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Right controls */}
        <div className="ml-auto md:ml-2 flex items-center gap-2">
          <GithubLink />
          <LinkedinLink />
          <MailLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
