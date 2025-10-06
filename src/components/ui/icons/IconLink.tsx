// src/components/IconLink.tsx
"use client";

import Link from "next/link";
import { Button, cn } from "@widgets";
import * as React from "react";

type IconLinkProps = {
  href: string; // url, mailto:, tel:, hash, etc.
  label: string; // accessible name / title
  children: React.ReactNode; // your <svg>…</svg>
  newTab?: boolean; // force _blank (defaults based on href)
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: "icon" | "sm" | "default" | "lg";
  rounded?: boolean;
  className?: string;
  iconClassName?: string;
};

const IconLink: React.FC<IconLinkProps> = ({
  href,
  label,
  children,
  newTab,
  variant = "icon",
  size = "icon",
  rounded = true,
  className,
  iconClassName,
}) => {
  const isHttpExternal = /^(https?:)?\/\//.test(href);
  const openInNewTab = newTab ?? isHttpExternal;

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(rounded && "rounded-full", className)}
      aria-label={label}
      title={label}
    >
      <Link
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
        <span className={cn("[&_svg]:size-6", iconClassName)}>{children}</span>
      </Link>
    </Button>
  );
};

export default IconLink;
