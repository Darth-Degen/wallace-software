"use client";
import { useLayoutEffect, useRef, type CSSProperties, type FC } from "react";
import { SeoHead, SplashScreen } from "@components";
import type { PageShellProps } from "@types";
import { useLoadingStore } from "@stores";
import { useRouter } from "next/router";

const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

type VarStyle = CSSProperties & {
  ["--header-h"]?: string;
  ["--footer-h"]?: string;
  ["--header-pad"]?: string;
};

const PageShell: FC<PageShellProps> = ({
  children,
  footer = true,
  seo,
  padForHeader = true,
  mainClassName,
  className,
}) => {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const footerBoxRef = useRef<HTMLDivElement | null>(null);

  const { assets, areAllLoaded, resetKeys } = useLoadingStore();
  const router = useRouter();

  const required = router.asPath === "/" ? ["home:bg"] : [];
  const loaded = areAllLoaded(required);

  // Simplified layout effect - only measure once after initial render
  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const header = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");

    const setVars = () => {
      const headerH = header?.getBoundingClientRect().height ?? 0;
      const footerH = footerEl?.getBoundingClientRect().height ?? 0; // 53px < md, 52px ≥ md (border diff) will be measured
      shell.style.setProperty("--header-h", `${Math.round(headerH)}px`);
      shell.style.setProperty("--footer-h", `${Math.round(footerH)}px`);
      shell.style.setProperty(
        "--app-h",
        `calc(100dvh - ${Math.round(headerH)}px - ${Math.round(footerH)}px)`
      );
    };

    setVars();

    const ro = new ResizeObserver(setVars);
    header && ro.observe(header);
    footerEl && ro.observe(footerEl);
    window.addEventListener("resize", setVars);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVars);
    };
  }, [padForHeader, footer]);

  return (
    <>
      {seo ? <SeoHead {...seo} /> : null}
      {/* App shell */}
      <div
        ref={shellRef}
        style={
          {
            "--header-h": "64px", // defaults: header h-16
            "--footer-h": "53px", // mobile footer (with border)
            "--app-h": "calc(100dvh - 64px - 53px)",
            "--header-pad": padForHeader ? "64px" : "0px",
          } as VarStyle
        }
        className="w-full flex flex-col"
      >
        <main
          id="page-main"
          className={cx(
            "relative flex w-full flex-1 flex-col items-center overflow-x-clip bg-background",
            padForHeader && "pt-16 md:pt-20 pb-14 md:pb-[57px]",
            "min-h-[var(--app-h)]",
            className,
            mainClassName
          )}
        >
          {children}
          <SplashScreen
            loaded={loaded}
            minDurationMs={1000}
            padForHeader="top-16 md:top-20"
          />
        </main>

        {/* Wrap footer so we can measure its box without modifying the Footer component */}
        {/* <div ref={footerBoxRef}>{footer !== false && <Footer />}</div> */}
      </div>
    </>
  );
};

export default PageShell;
