// src/components/MailLink.tsx
"use client";

import * as React from "react";
import { IconLink } from "@components";

type MailLinkProps = {
  href?: string; // mailto:… by default
  label?: string;
  variant?: React.ComponentProps<typeof IconLink>["variant"];
  size?: React.ComponentProps<typeof IconLink>["size"];
  className?: string;
  iconClassName?: string;
};

const MailLink: React.FC<MailLinkProps> = ({
  href = "mailto:info@wallacesoftware.com",
  label = "Email",
  variant = "icon",
  size = "icon",
  className,
  iconClassName,
}) => (
  <IconLink
    href={href}
    label={label}
    variant={variant}
    size={size}
    className={className}
    iconClassName={iconClassName}
  >
    {/* Your mail SVG (fill made theme-aware) */}
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
      <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM17.9268 10.0801C17.8786 10.1062 13.1894 12.6465 12.167 12.6465C11.2291 12.6461 6.40728 10.0804 6.40723 10.0801L6.40039 15.8398C6.40039 16.3698 6.83093 16.7998 7.36133 16.7998H16.9736C17.5049 16.7997 17.9346 16.3697 17.9346 15.8398L17.9268 10.0801ZM7.36133 7.2002C6.83045 7.2002 6.40039 7.63024 6.40039 8.16016V8.58789C6.44983 8.61591 11.2339 11.3258 12.167 11.3262C13.146 11.3262 17.8926 8.65887 17.9268 8.63965L17.9346 8.16016C17.9346 7.6303 17.5049 7.2003 16.9736 7.2002H7.36133Z" />
    </svg>
  </IconLink>
);

export default MailLink;
