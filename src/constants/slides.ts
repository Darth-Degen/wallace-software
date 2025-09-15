import { Logo } from "@components";
import { SlideMeta } from "@types";

export const slides: SlideMeta[] = [
  { id: "hero",       title: "Home",       category: "intro",      accent: "orange", component: Logo },
  { id: "experience", title: "Experience", category: "experience", accent: "yellow", component: Logo },
  { id: "skills",     title: "Skills",     category: "skills",     accent: "purple", component: Logo },
  { id: "about",      title: "About",      category: "about",      accent: "green",  component: Logo },
  // projects (use one component + props, or generate from project data)
  { id: "proj-fuzzy", title: "Fuzzy",      category: "project",    accent: "red",    component: Logo },
  { id: "proj-figma", title: "Figma",      category: "project",    accent: "blue",   component: Logo },
  // ...
];

// export const slides: SlideMeta[] = [
//   { id: "hero",       title: "Home",       category: "intro",      accent: "orange", component: HeroSlide },
//   { id: "experience", title: "Experience", category: "experience", accent: "yellow", component: ExperienceSlide },
//   { id: "skills",     title: "Skills",     category: "skills",     accent: "purple", component: SkillsSlide },
//   { id: "about",      title: "About",      category: "about",      accent: "green",  component: AboutSlide },
//   // projects (use one component + props, or generate from project data)
//   { id: "proj-fuzzy", title: "Fuzzy",      category: "project",    accent: "red",    component: PortfolioSlide },
//   { id: "proj-figma", title: "Figma",      category: "project",    accent: "blue",   component: PortfolioSlide },
//   // ...
// ];