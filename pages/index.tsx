// pages/index.tsx
import { HomeView, withPageShell } from "@components";

export default withPageShell(
  HomeView,
  /* shellProps */ {
    padForHeader: true,
  },
  /* pageOptions */ {
    header: "sticky",
  }
);
