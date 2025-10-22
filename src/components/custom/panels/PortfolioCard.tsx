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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@widgets";
import { Github, Globe, InfoIcon } from "lucide-react";

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
            {/* <Laptop className="h-4 w-4" /> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="More info"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground transition-300"
                  >
                    <InfoIcon className="h-[18px] w-[18px]" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  align="start"
                  className="bg-card-foreground mt-2 max-w-[300px] sm:max-w-[400px] opacity-80 backdrop-blur text-[13px]"
                >
                  <p>
                    {item.description}
                    {" Built with "}
                    {item.skills.map((s, i) => {
                      if (i + 1 < item.skills.length) return `${s}, `;
                      else return `and ${s}.`;
                    })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            My Portfolio - {item.title}
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
        <p></p>
        <VideoPlayer
          videoId={item.videoId}
          autoPlay={true}
          muted
          loop
          controls={false}
          playsInline
          parentClassName="rounded-b-2xl overflow-hidden w-full aspect-[1654/1080]"
          className="rounded-b-2xl overflow-hidden aspect-[1654/1080]"
        />
      </PanelCardContent>
    </PanelCardRoot>
  );
}
