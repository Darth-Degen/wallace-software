import { NavPage } from "@types";
import { AccentColor } from "@stores";

export const PAGES: NavPage[] = [
  {
    name: "Home",
    path: "/",
    hideFromCarousel: true,
    accentColor: "orange" as AccentColor,
  },
  {
    name: "About",
    path: "/#about",
    showInFooter: true,
    accentColor: "orange" as AccentColor,
  },
  {
    name: "Experience",
    path: "/#experience",
    showInFooter: true,
    accentColor: "yellow" as AccentColor,
  },
  {
    name: "Skills",
    path: "/#skills",
    showInFooter: true,
    accentColor: "blue" as AccentColor,
  },
  //portfolio slides
  {
    name: "Portfolio",
    path: "/#portfolio-scum",
    showInFooter: true,
    accentColor: "scum" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio-somosaxolotl",
    accentColor: "somos" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio-sandbox",
    accentColor: "sandbox" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio-folio",
    accentColor: "folio" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio-cyberfrogs",
    accentColor: "cyberfrogs" as AccentColor,
  },
  {
    name: "Portfolio",
    path: "/#portfolio-publique",
    accentColor: "publique" as AccentColor,
  },
];
