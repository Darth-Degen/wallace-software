"use client";

import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  VideoPlayer,
} from "@components";
import { useWindowSize } from "@hooks";
import { PortfolioItem } from "@types";
import { Github, Globe, Laptop, Share2 } from "lucide-react";
import { isMobile } from "react-device-detect";

type PortfolioCardProps = {
  item: PortfolioItem;
  className?: string;
};

export default function PortfolioCard({ item, className }: PortfolioCardProps) {
  // const [width, height, isMobile] = useWindowSize();
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
            {item.githubUrl && (
              <ToolbarIcon
                label="GitHub"
                onClick={() => window.open(item.githubUrl, "_blank")}
              >
                <Github className="h-4 w-4" />
              </ToolbarIcon>
            )}
            {item.projectUrl && (
              <ToolbarIcon
                label="projectUrl"
                onClick={() => window.open(item.projectUrl, "_blank")}
              >
                <Globe className="h-4 w-4" />
              </ToolbarIcon>
            )}
          </div>
        }
      />
      <PanelCardContent className="flex flex-col flex-grow !p-0 w-full aspect-[1654/1080]">
        <VideoPlayer
          videoId={item.videoId}
          autoPlay={!isMobile}
          muted
          loop
          controls={isMobile}
          parentClassName="rounded-b-2xl overflow-hidden w-full aspect-[1654/1080]"
          className="rounded-b-2xl overflow-hidden aspect-[1654/1080]"
        />
      </PanelCardContent>
    </PanelCardRoot>
  );
}
