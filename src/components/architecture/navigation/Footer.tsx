import { PAGES } from "@constants";
import { useColorTheme, useCarousel, AccentColor } from "@stores";
import { cn, handleCopyEmail } from "@utils";
import { FC } from "react";

const Footer: FC = () => {
  const { setAccentColorAndSection } = useColorTheme();
  const { currentSlide, setSlide } = useCarousel();

  const handleNavClick = (page: (typeof PAGES)[0], index: number) => {
    // Set both the accent color and active section for this page when clicked
    if (page.accentColor) {
      setAccentColorAndSection(page.accentColor as AccentColor, page.path);
    }
    // Update carousel slide
    setSlide(index);
  };

  return (
    <footer className="px-4 md:px-8 py-12 lg:py-4">
      <div className="max-w-[1512px] mx-auto flex   items-center justify-between gap-4 lg:gap-3">
        {/* Left side */}
        <div className="flex items-center gap-2 text-muted-foreground w-[160px]">
          <span className="text-sm">
            © {new Date().getFullYear()} Wallace Software
          </span>
        </div>

        {/* Middle: navigation links from config */}
        <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm lg:text-sm">
          {PAGES.filter((p) => p.showInFooter).map((page, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={page.path}
                onClick={() => handleNavClick(page, index)}
                className={cn(
                  "transition-300 hover:text-accent",
                  isActive
                    ? "text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {page.name}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 text-white/30 w-[160px]">
          <p
            className="lg:block hidden cursor-pointer ml-2 text-muted-foreground hover-text-accent text-sm"
            onClick={handleCopyEmail}
          >
            info@wallace.software
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
