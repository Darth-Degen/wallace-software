import { GithubLink, LinkedinLink, MailLink } from "@components";
import { PAGES } from "@constants";
import { useColorTheme, AccentColor } from "@stores";
import { cn } from "@utils";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  const { activeSection, setAccentColorAndSection } = useColorTheme();

  const handleNavClick = (page: (typeof PAGES)[0]) => {
    // Set both the accent color and active section for this page when clicked
    if (page.accentColor) {
      setAccentColorAndSection(page.accentColor as AccentColor, page.path);
    }
  };

  return (
    <footer className="max-w-[1512px] px-4 md:px-8 py-12 lg:py-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse items-center justify-center gap-4 lg:gap-6">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <span className="text-sm">
            © {new Date().getFullYear()} Wallace Software
          </span>
        </div>

        {/* Middle: navigation links from config */}
        <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm lg:text-sm">
          {PAGES.filter((p) => p.showInFooter).map((page) => {
            const isActive = activeSection === page.path;
            return (
              <Link
                key={page.path}
                href={page.path}
                onClick={() => handleNavClick(page)}
                className={cn(
                  "transition-300 hover:text-accent",
                  isActive
                    ? "text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {page.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
