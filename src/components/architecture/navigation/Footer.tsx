import { PAGES } from "@constants";
import { useColorTheme, useCarousel, AccentColor } from "@stores";
import { cn, handleCopyEmail } from "@utils";
import { FC, useMemo } from "react";

const Footer: FC = () => {
  const { setAccentColorAndSection } = useColorTheme();
  const {
    currentSlide,
    setFooterSlide,
    footerToCarouselMap,
    getCarouselPages,
  } = useCarousel();

  // Footer pages (only those with showInFooter)
  const footerPages = useMemo(() => PAGES.filter((p) => p.showInFooter), []);

  // Current slide path (for portfolio grouping)
  const currentPath = getCarouselPages()[currentSlide]?.path || "";
  const portfolioActive = currentPath.includes("#portfolio-");

  console.log("footerPages : ", footerPages);

  const handleNavClick = (
    page: (typeof PAGES)[number],
    footerIndex: number
  ) => {
    if (page.accentColor) {
      setAccentColorAndSection(page.accentColor as AccentColor, page.path);
    }
    setFooterSlide(footerIndex);
  };

  return (
    <footer className="px-4 md:px-8 py-4 h-14 fixed bottom-0 border-t border-border md:border-none bg-background w-full  z-50">
      <div className="max-width mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-3">
        {/* Left */}
        <div className="lg:flex hidden items-center gap-2 text-muted-foreground w-[160px]">
          <span className="text-sm">
            © {new Date().getFullYear()} Wallace Software
          </span>
        </div>

        {/* Center nav */}
        <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm">
          {footerPages.map((p, i) => {
            const carouselIndex = footerToCarouselMap[i];
            const isPortfolioFooterItem = p.path.includes("#portfolio-");
            const isActive =
              carouselIndex === currentSlide ||
              (isPortfolioFooterItem && portfolioActive);

            return (
              <button
                key={p.path}
                onClick={() => handleNavClick(p, i)}
                className={cn(
                  "transition-300 hover:text-accent",
                  isActive
                    ? "text-accent font-medium delay-300 transition-colors duration-1000"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.name}
              </button>
            );
          })}
        </nav>

        {/* Right (example contact) */}
        <div className="lg:flex hidden items-center justify-end gap-2 text-white/30 w-[160px]">
          <p
            className="ml-2 text-sm text-muted-foreground cursor-pointer hover:text-accent transition-300"
            onClick={() => handleCopyEmail()}
          >
            info@wallace.software
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
