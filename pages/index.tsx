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
      title: "Wallace | Frontend Developer",
      description:
        "I work with Next.js, TypeScript, and Tailwind CSS to write clean, maintainable code that turns thoughtful designs into a seamless user experience.",
      url: "https://wallace.software",
    },
  }
);
