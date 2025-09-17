import { PAGES } from "@constants";
import { useColorTheme, useCarousel, AccentColor } from "@stores";
import { cn } from "@utils";
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
    <footer className="px-4 md:px-8 py-12 lg:py-6">
      <div className="max-w-[1512px] mx-auto flex flex-col-reverse items-center justify-center gap-4 lg:gap-6">
        {/* Left side */}
        <div className="flex items-center gap-2">
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
      </div>
    </footer>
  );
};

export default Footer;
