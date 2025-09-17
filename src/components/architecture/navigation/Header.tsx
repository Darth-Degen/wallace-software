"use client";
import { FC } from "react";
import { GithubLink, LinkedinLink, Logo, MailLink } from "@components";
import toast from "react-hot-toast";

const Header: FC = ({}) => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@wallace.software");
      toast.success("Email copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = "info@wallace.software";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Email copied to clipboard!");
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b">
      <div className="page-padding mx-auto h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Right controls */}
        <div className="ml-auto md:ml-2 flex items-center gap-2">
          <GithubLink />
          <LinkedinLink />
          <MailLink />
          <p
            className="lg:block hidden cursor-pointer ml-2 hover-text-accent"
            onClick={handleCopyEmail}
          >
            info@wallace.software
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
