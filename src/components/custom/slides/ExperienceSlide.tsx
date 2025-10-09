import { FC } from "react";
import { AnimatedSlide, AnimatedChild, ExperienceCard } from "@components";

interface ExperienceSlideProps {
  className?: string;
  animationTrigger?: "pageLoad" | "slideTransition";
  direction?: 1 | -1;
}

const ExperienceSlide: FC<ExperienceSlideProps> = ({
  className = "",
  animationTrigger = "pageLoad",
  direction = 1,
}) => {
  return (
    <AnimatedSlide animationTrigger="pageLoad" className="px-6 py-10">
      <AnimatedChild animation="fade" className="z-0 max-w-6xl w-full">
        <div className="mx-auto text-center mb-10">
          <AnimatedChild animation={"fade"} delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold">Experience</h1>
          </AnimatedChild>
          <AnimatedChild animation={"fade"} delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground mt-3">
              10+ years building frontend experiences for startups and Web3
            </p>
          </AnimatedChild>
        </div>

        <div className="grid gap-6 md:gap-7 xl:grid-cols-3 justify-center px-10 sm:px-16 md:px-32 lg:px-0">
          <ExperienceCard
            range="2022-Present"
            title="Co-Founder, Sandbox Studio"
            bullets={[
              "Bring elegant designs to life through pixel-perfect frontend development.",
              "Engineer component-driven websites that load quickly, scale easily, and deliver a memorable online experience.",
              "Collaborate closely with designers and founders to turn creative direction into high functioning products.",
              "Leverage blockchain technologies to create unique, interactive experiences for NFT holders and Web3 communities.",
            ]}
            website="https://sandboxstud.io"
          />
          <ExperienceCard
            range="2022"
            title="Senior Frontend Developer, De Labs"
            bullets={[
              "Led the development of multiple Web3 products from NFT staking platforms to minting sites, turning ambitious creative direction into live, interactive products.",
              "Translated constantly evolving designs into responsive, production-ready builds, optimizing every pixel, animation, and load time.",
              "Entered as a mobile developer and left a true frontend specialist, refined through tight deadlines, constant pivots, and nonstop creative pressure.",
            ]}
            linkedin="https://www.linkedin.com/company/delabsxyz/"
          />
          <ExperienceCard
            range="2014-2021"
            title="Mobile Developer, Streamline VRS"
            bullets={[
              "Led the development of multiple mobile apps supporting property managers, homeowners, and guests within a complex vacation rental ecosystem.",
              "Worked directly with users and clients through the feedback loop, diagnosing issues, shipping fixes, and continuously improving UX.",
              "Built and maintained PHP + PostgreSQL APIs to support mobile app functionality and improve data performance.",
              //"Learned to self-direct and problem-solve without mentorship, developing the independence and technical resourcefulness that define my work today.",
              //Evolved from a solo contributor to team lead, mentoring junior developers and collaborating with QA to maintain product stability.
              //
              //
            ]}
            linkedin="https://www.linkedin.com/company/streamline-property-management-software"
          />
        </div>
      </AnimatedChild>
    </AnimatedSlide>
  );
};

export default ExperienceSlide;
