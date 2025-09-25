"use client";

import { Calendar, Play } from "lucide-react";
import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  BulletRow,
} from "@components";
import { Github, Share2 } from "lucide-react";

type ExperienceCardProps = {
  range: string; // “2022–Present”
  title: string; // “Co-Founder, Sandbox Studio”
  bullets: string[];
  onGithub?: () => void;
  onShare?: () => void;
  className?: string;
};

export default function ExperienceCard({
  range,
  title,
  bullets,
  onGithub,
  onShare,
  className,
}: ExperienceCardProps) {
  return (
    <PanelCardRoot className={className} elevated>
      <PanelCardHeader
        meta={
          <MetaPill>
            <Calendar className="h-4 w-4" />
            {range}
          </MetaPill>
        }
        title={title}
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
      <PanelCardContent className="space-y-4">
        {bullets.map((b, i) => (
          <BulletRow key={i} icon={<Play className="h-3.5 w-3.5" />}>
            {b}
          </BulletRow>
        ))}
      </PanelCardContent>
    </PanelCardRoot>
  );
}
