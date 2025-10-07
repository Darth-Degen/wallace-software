"use client";

import { Calendar, Github, Globe, Play, Share2 } from "lucide-react";
import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  BulletRow,
} from "@components";

type ExperienceCardProps = {
  range: string;
  title: string;
  bullets: string[];
  github?: string;
  website?: string;
  className?: string;
};

export default function ExperienceCard({
  range,
  title,
  bullets,
  github,
  website,
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
          <div className="flex items-center gap-2 h-4">
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
      <PanelCardContent className="space-y-0.5">
        {bullets.map((b, i) => (
          <BulletRow key={i} icon={<Play className="h-3.5 w-3.5" />}>
            {b}
          </BulletRow>
        ))}
      </PanelCardContent>
    </PanelCardRoot>
  );
}
