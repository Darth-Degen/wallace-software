"use client";

import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  RatingsRow,
  VideoPlayer,
} from "@components";
import { Github, Laptop, Share2 } from "lucide-react";

type ExperienceCardProps = {
  header: string;
  onGithub?: () => void;
  onShare?: () => void;
  className?: string;
};

export default function ExperienceCard({
  header,
  onGithub,
  onShare,
  className,
}: ExperienceCardProps) {
  return (
    <PanelCardRoot className={className} elevated>
      <PanelCardHeader
        meta={
          <MetaPill>
            <Laptop className="h-4 w-4" />
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
      <PanelCardContent className="flex flex-col flex-grow !p-0">
        <VideoPlayer
          autoPlay
          muted
          loop
          parentClassName="rounded-b-2xl overflow-hidden"
          className="rounded-b-2xl overflow-hidden"
        />
      </PanelCardContent>
    </PanelCardRoot>
  );
}
