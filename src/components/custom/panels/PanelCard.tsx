"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@widgets";
import { cn } from "@widgets";
import { AnimatedChild } from "@components";

type MotionDivProps = HTMLMotionProps<"div">;

type PanelCardRootProps = {
  children: React.ReactNode;
  asChild?: boolean;
  interactive?: boolean; // hover ring / translate
  elevated?: boolean; // subtle shadow
  bleed?: boolean; // remove default padding
  className?: string;
} & MotionDivProps;

export const PanelCardRoot = ({
  children,
  interactive = true,
  elevated = false,
  bleed = false,
  className,
  ...motionProps
}: PanelCardRootProps) => {
  return (
    <AnimatedChild
      animation={"scale"}
      delay={0.6}
      // whileHover={interactive ? { y: -2 } : undefined}
      // transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.6 }}
      // {...motionProps}
      className={cn(
        // base
        "rounded-2xl border bg-card/60 text-card-foreground backdrop-blur",
        // match your screenshots: soft border + subtle inner glow
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        elevated && "shadow-xl",
        interactive && "hover:border-white/20",
        className
      )}
    >
      <Card
        className={cn(
          "rounded-2xl border-0 bg-transparent",
          bleed && "px-0 py-0"
        )}
      >
        {children}
      </Card>
    </AnimatedChild>
  );
};

type PanelCardHeaderProps = React.ComponentProps<typeof CardHeader> & {
  meta?: React.ReactNode; // the left pill (e.g., “2022–Present”)
  title?: React.ReactNode; // main title
  subtitle?: React.ReactNode; // optional subtitle
  toolbar?: React.ReactNode; // right-side icon buttons
};

export function PanelCardHeader({
  meta,
  title,
  subtitle,
  toolbar,
  className,
  ...props
}: PanelCardHeaderProps) {
  return (
    <CardHeader
      className={cn("px-0 pt-3 pb-4", "flex flex-col", className)}
      {...props}
    >
      {(meta || toolbar) && (
        <div className="flex items-center justify-between border-b border-border pb-3 w-full">
          {meta ? (
            <div className="flex items-center gap-2">{meta}</div>
          ) : (
            <span />
          )}
          {toolbar}
        </div>
      )}

      {(title || subtitle) && (
        <div className="text-left px-6 md:px-7 pt-4">
          {title && (
            <div className="text-lg md:text-lg font-semibold leading-tight">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-sm md:text-base text-muted-foreground mt-1">
              {subtitle}
            </div>
          )}
        </div>
      )}
    </CardHeader>
  );
}

export function PanelCardContent(
  props: React.ComponentProps<typeof CardContent>
) {
  return (
    <CardContent
      {...props}
      className={cn(
        "px-6 pb-6 md:px-7 md:pb-7 flex-grow min-h-[150px] lg:min-h-[250px]",
        props.className
      )}
    />
  );
}

export function PanelCardFooter(
  props: React.ComponentProps<typeof CardFooter>
) {
  return (
    <CardFooter
      {...props}
      className={cn("px-6 pt-0 pb-6 md:px-7 md:pb-7", props.className)}
    />
  );
}

/* Utility bits you’ll reuse across sections */

export function MetaPill({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-1",
        "text-xs md:text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ToolbarIcon({
  children,
  label,
  onClick,
}: React.PropsWithChildren<{ label: string; onClick?: () => void }>) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center",
        "rounded-full border",
        "hover:border-white/20 transition"
      )}
    >
      {children}
    </button>
  );
}

/** A simple list row with a left icon—great for Experience bullet lines */
export function BulletRow({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm md:text-base py-0.5",
        className
      )}
    >
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md">
        {icon}
      </span>
      <div className="text-left text-muted-foreground">{children}</div>
    </div>
  );
}
