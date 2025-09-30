export type Direction = 1 | -1; // 1 = next/right, -1 = prev/left

export type CarouselState = {
  index: number;
  direction: Direction;
  setIndex: (next: number, dir?: Direction) => void;
  next: () => void;
  prev: () => void;
  setById: (id: string) => void;
};

export type SlideCategory = "intro" | "experience" | "skills" | "about" | "project";

export type SlideMeta = {
  id: string;                  // for deep links: #skills
  title: string;
  category: SlideCategory;
  accent: "yellow" | "green" | "orange" | "red" | "purple" | "blue";
  component: React.ComponentType; // the actual slide component
};

//Skills  

export type SkillRating = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  learning?: boolean; // if true, indicates currently learning this skill
};
export type Skills = {
  category: string;
  ratings: SkillRating[]; 
};