"use client";
import { FC } from "react";
import { GithubLink, LinkedinLink, Logo, MailLink } from "@components";
import { motion } from "framer-motion";
import { useViewStore } from "@stores";

const Header: FC = () => {
  const { showView } = useViewStore();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: showView ? 0 : -80 }}
      exit={{ y: -80 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 2 }}
      className="fixed top-0 inset-x-0 z-50 border-b bg-background"
    >
      <div className="px-4 md:px-8 2xl:px-2  mx-auto max-width h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Right controls */}
        <div className="ml-auto md:ml-2 flex items-center gap-2">
          <GithubLink />
          <LinkedinLink />
          <MailLink />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
