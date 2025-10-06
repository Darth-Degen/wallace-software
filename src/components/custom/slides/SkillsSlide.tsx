import { FC, useEffect } from "react";
import { SkillsCard, AnimatedChild, AnimatedSlide } from "@components";
import { Laptop, ClipboardList } from "lucide-react";

interface SkillsSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const SkillsSlide: FC<SkillsSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
  direction = 1,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // or "smooth"
    }
  }, []); // runs once when slide mounts

  return (
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild animation="fade" className="z-0 max-w-6xl w-full">
        <div className="mx-auto text-center mb-10">
          <AnimatedChild animation={"fade"} delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold">Skills</h1>
          </AnimatedChild>
          <AnimatedChild animation={"fade"} delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground mt-3">
              Specializing in React and Next.js, while continuously learning
              emerging tools.
            </p>
          </AnimatedChild>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 px-10 sm:px-16 md:px-32 lg:px-0">
          <SkillsCard
            icon={<Laptop className="h-4 w-4" />}
            header="Frontend Development"
            className="xl:w-[340px]"
            skills={[
              {
                category: "Core Frontend Stack",
                ratings: [
                  { name: "React", level: 5 },
                  { name: "Tailwind CSS", level: 5 },
                  { name: "Typescript", level: 4 },
                  { name: "Next.js", level: 4 },
                  { name: "Framer Motion", level: 4 },
                ],
              },
              {
                category: "Development Practices",
                ratings: [
                  { name: "Mobile Responsiveness", level: 5 },
                  { name: "Performance Optimization", level: 4 },
                  { name: "SEO", level: 4 },
                ],
              },
            ]}
          />
          <SkillsCard
            icon={<ClipboardList className="h-4 w-4" />}
            header="Extended Skillset"
            className="xl:w-[340px]"
            skills={[
              {
                category: "Design & UI ",
                ratings: [
                  { name: "UX/UI Collaboration", level: 5 },
                  { name: "Figma", level: 4 },
                  { name: "Design Principles", level: 3, learning: true },
                  { name: "Webflow", level: 3, learning: true },
                ],
              },
              {
                category: "Backend & Web3 ",
                ratings: [
                  { name: "API Integration", level: 5 },
                  { name: "Web3 Frontend Integration", level: 3 },
                  { name: "Node.js ", level: 2, learning: true },
                  { name: "Supabase ", level: 1, learning: true },
                ],
              },
            ]}
          />
        </div>
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default SkillsSlide;
