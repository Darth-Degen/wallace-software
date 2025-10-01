"use client";

import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  VideoPlayer,
} from "@components";
import { PortfolioItem } from "@types";
import { Github, Laptop, Share2 } from "lucide-react";

type PortfolioCardProps = {
  item: PortfolioItem;
  className?: string;
};

export default function PortfolioCard({ item, className }: PortfolioCardProps) {
  return (
    <PanelCardRoot className={className} elevated>
      <PanelCardHeader
        meta={
          <MetaPill>
            <Laptop className="h-4 w-4" />
            {item.title}
          </MetaPill>
        }
        toolbar={
          <div className="flex items-center gap-2">
            <ToolbarIcon
              label="GitHub"
              onClick={() => window.open(item.githubUrl, "_blank")}
            >
              <Github className="h-4 w-4" />
            </ToolbarIcon>

            <ToolbarIcon
              label="Share"
              onClick={() => window.open(item.projectUrl, "_blank")}
            >
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
