"use client";

import {
  PanelCardRoot,
  PanelCardHeader,
  PanelCardContent,
  MetaPill,
  ToolbarIcon,
  RatingsRow,
} from "@components";
import { Github, Globe, Share2 } from "lucide-react";
import { Skills } from "@types";

type ExperienceCardProps = {
  header: string; // “2022–Present”
  skills: Skills[];
  github?: string;
  website?: string;
  className?: string;
  icon: React.ReactNode;
};

export default function ExperienceCard({
  header,
  skills,
  github,
  website,
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
