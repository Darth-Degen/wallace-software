// pages/index.tsx
import { HomeView, withPageShell } from "@components";

export default withPageShell(
  HomeView,
  /* shellProps */ {
    padForHeader: true,
  },
  /* pageOptions */ {
    header: "sticky",
    seo: {
      title: "Wallace Software | React & Next.js Frontend Engineer",
      description:
        "Building fast, accessible web apps with React, Next.js, and Tailwind. Explore projects, skills, and contact.",
      url: "https://wallace.software",
    },
  }
);
