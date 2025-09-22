import { SlideData, SlideType } from "@types";

export const slideData: Record<SlideType, SlideData> = {
  home: {
    id: "home",
    title: "Welcome to Wallace Software",
    description: "Building innovative digital solutions with modern technologies and creative design"
  },
  about: {
    id: "about",
    title: "About Me",
    description: "Passionate developer with expertise in full-stack development and user experience design"
  },
  experience: {
    id: "experience",
    title: "Experience",
    description: "Professional journey through various technologies and challenging projects"
  },
  skills: {
    id: "skills",
    title: "Skills & Technologies",
    description: "Technical expertise across frontend, backend, and modern development tools"
  },
  portfolio: {
    id: "portfolio",
    title: "Portfolio",
    description: "Showcase of projects that demonstrate creativity, technical skill, and problem-solving"
  }
};
