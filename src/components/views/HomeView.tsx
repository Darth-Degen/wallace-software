"use client";

import { SimpleReveal } from "@animations";
import { ThemeSwitch } from "@components";
import { Button } from "@widgets";
import { FC } from "react";

interface Props {}

const LandingView: FC<Props> = (props: Props) => {
  const {} = props;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-24 gap-10">
      {/* <section
        data-accent="purple"
        className="min-h-[100svh] bg-background text-foreground"
      >
        <Button className="bg-primary text-primary-foreground">
          View Project
        </Button>
      </section> */}
      <SimpleReveal delay={0.025} as="section">
        <div className="bg-bg text-fg border border-border rounded-xl p-6 grid grid-cols-3 gap-2">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="pill">Pill</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">Learn more</Button>
          <Button variant="outline" className="border-dashed">
            Dashed
          </Button>

          <Button loading>Saving…</Button>
        </div>
      </SimpleReveal>
      <SimpleReveal as="section">
        <div className="bg-bg text-fg border border-border rounded-xl p-6">
          <h1 className="text-2xl font-semibold">Home</h1>
          <p className="text-fg/70">This text dims correctly in both themes.</p>
          <SimpleReveal delay={0.05}>
            <ThemeSwitch />
          </SimpleReveal>
        </div>
      </SimpleReveal>
    </div>
  );
};

export default LandingView;
