"use client";
import { useLayoutEffect, useRef, type CSSProperties, type FC } from "react";
import { Footer, SeoHead, SplashScreen } from "@components";
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
    const footerBox = footerBoxRef.current;

    // Single measurement after initial render, avoiding multiple recalculations
    const measureAndApply = () => {
      const headerH = header?.getBoundingClientRect().height ?? 0;
      const footerH = footerBox?.getBoundingClientRect().height ?? 0;

      shell.style.setProperty("--header-h", `${Math.round(headerH)}px`);
      shell.style.setProperty("--footer-h", `${Math.round(footerH)}px`);
      shell.style.setProperty(
        "--header-pad",
        padForHeader ? `${Math.round(headerH)}px` : "0px"
      );
    };

    // Delay measurement to after fonts/images load, but only once
    const timer = setTimeout(measureAndApply, 100);

    return () => {
      clearTimeout(timer);
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
            // stable defaults to prevent layout shifts - match header h-16 md:h-20
            "--header-h": "64px",
            "--footer-h": "120px",
            "--header-pad": "64px",
          } as VarStyle
        }
        className="w-full min-h-screen flex flex-col"
      >
        <main
          id="page-main"
          className={cx(
            "relative flex w-full h-full flex-1 flex-col items-center overflow-x-clip bg-background",
            padForHeader && "py-16 md:py-20",
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
        <div ref={footerBoxRef}>{footer !== false && <Footer />}</div>
      </div>
    </>
  );
};

export default PageShell;
