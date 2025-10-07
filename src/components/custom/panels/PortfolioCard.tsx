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

type PortfolioCardProps = {
  item: PortfolioItem;
  className?: string;
  github?: string;
  website?: string;
};

export default function PortfolioCard({
  item,
  className,
  github,
  website,
}: PortfolioCardProps) {
  const [width, height, isMobile] = useWindowSize();
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
            {github && (
              <ToolbarIcon
                label="GitHub"
                onClick={() => window.open(github, "_blank")}
              >
                <Github className="h-4 w-4" />
              </ToolbarIcon>
            )}
            {website && (
              <ToolbarIcon
                label="Website"
                onClick={() => window.open(website, "_blank")}
              >
                <Globe className="h-4 w-4" />
              </ToolbarIcon>
            )}
          </div>
        }
      />
      <PanelCardContent className="flex flex-col flex-grow !p-0">
        <VideoPlayer
          autoPlay={!isMobile}
          muted
          loop
          controls={isMobile}
          parentClassName="rounded-b-2xl overflow-hidden"
          className="rounded-b-2xl overflow-hidden"
        />
      </PanelCardContent>
    </PanelCardRoot>
  );
}
