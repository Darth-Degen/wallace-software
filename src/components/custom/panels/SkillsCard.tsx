"use client";

import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  RatingsRow,
} from "@components";
import { Github, Share2 } from "lucide-react";
import { Skills } from "@types";

type ExperienceCardProps = {
  header: string; // “2022–Present”
  skills: Skills[];
  onGithub?: () => void;
  onShare?: () => void;
  className?: string;
  icon: React.ReactNode;
};

export default function ExperienceCard({
  header,
  skills,
  onGithub,
  onShare,
  className,
  icon,
}: ExperienceCardProps) {
  return (
    <PanelCardRoot className={className} elevated>
      <PanelCardHeader
        meta={
          <MetaPill>
            {icon}
            {header}
          </MetaPill>
        }
        toolbar={
          <div className="flex items-center gap-2">
            <ToolbarIcon label="GitHub" onClick={onGithub}>
              <Github className="h-4 w-4" />
            </ToolbarIcon>
            <ToolbarIcon label="Share" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </ToolbarIcon>
          </div>
        }
      />
      <PanelCardContent className="flex flex-col flex-grow">
        <p className="text-start py-2.5 font-semibold text-white/80">
          {skills[0].category}
        </p>
        {skills[0].ratings.map((s, i) => (
          <RatingsRow key={i} skill={s} />
        ))}
        <p className="text-start py-2.5 font-semibold text-white/80">
          {skills[1].category}
        </p>
        {skills[1].ratings.map((s, i) => (
          <RatingsRow key={i} skill={s} />
        ))}
      </PanelCardContent>
    </PanelCardRoot>
  );
}
