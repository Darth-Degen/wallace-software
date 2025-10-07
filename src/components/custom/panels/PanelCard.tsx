"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@widgets";
import { cn } from "@widgets";
import { AnimatedChild } from "@components";
import { SkillRating } from "@types";
import { BookOpen, Star } from "lucide-react";

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
      className={cn(
        // base
        "rounded-2xl border bg-card/60 text-card-foreground backdrop-blur min-w-64",
        // match your screenshots: soft border + subtle inner glow
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        elevated && "shadow-xl",
        interactive &&
          "transition-colors duration-300 hover:border-white/20 group",
        className
      )}
    >
      <Card
        className={cn(
          "rounded-2xl border-0 bg-transparent h-full",
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
      className={cn("px-0 pt-3 pb-0", "flex flex-col", className)}
      {...props}
    >
      {(meta || toolbar) && (
        <div className="border-b pb-3 w-full transition-300 group-hover:border-white/20">
          <div className="flex items-center justify-between px-3">
            {meta ? (
              <div className="flex items-center gap-2">{meta}</div>
            ) : (
              <span />
            )}
            {toolbar}
          </div>
        </div>
      )}

      {(title || subtitle) && (
        <div className="text-left px-6 md:px-7 pt-4 pb-4">
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
      className={cn("px-6 pb-6 md:px-7 md:pb-7 flex-grow", props.className)}
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
        "inline-flex items-center gap-2 rounded-lg px-0 py-1",
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
        "inline-flex h-8 md:h-9 w-8 md:w-9 items-center justify-center",
        "rounded-full border border-white/30",
        "hover:border-white/80 text-white/30 hover:text-white/80 transition-300"
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
/** A row displaying skill ratings with stars */
export function RatingsRow({
  skill,
  className,
}: {
  skill: SkillRating;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 text-sm md:text-base py-0.5 group",
        className
      )}
    >
      <div className="text-left text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
        {skill.name}
      </div>
      <div className="row-centered gap-0">
        {Array.from({ length: skill.level }).map((_, i) => (
          <span
            key={i}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
          >
            <Star
              className={cn(
                "h-4 w-4 ",
                i === 4
                  ? "text-template-yellow"
                  : "text-template-yellow/30 group-hover:text-template-yellow transition-colors duration-300"
              )}
            />
          </span>
        ))}
        {skill.learning && (
          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md">
            <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
          </span>
        )}
      </div>
    </div>
  );
}
