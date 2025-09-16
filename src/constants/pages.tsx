import { NavPage } from "@types";
import { AccentColor } from "@stores";

export const PAGES: NavPage[] = [
  {
    name: "Home",
    path: "/",
    showInHeader: false,
    showInFooter: true,
    accentColor: "orange" as AccentColor,
  },
  {
    name: "About",
    path: "/#about",
    showInHeader: false,
    showInFooter: true,
    accentColor: "blue" as AccentColor,
  },
  {
    name: "Experience",
    path: "/#experience",
    showInHeader: false,
    showInFooter: true,
    accentColor: "green" as AccentColor,
  },
  {
    name: "Skills",
    path: "/#skills",
    showInHeader: false,
    showInFooter: true,
    accentColor: "purple" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio",
    showInHeader: false,
    showInFooter: true,
    accentColor: "pink" as AccentColor,
  },
];
