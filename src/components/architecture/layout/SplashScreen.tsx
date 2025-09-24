"use client";

import {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useViewStore } from "src/stores";

interface Props {
  assets?: boolean[];
  /** Minimum time (ms) the splash should remain visible, even if assets load instantly. */
  minDurationMs?: number;
  /** Extra time (ms) to wait after assets finish before hiding. */
  delayMs?: number;
  /** Accessible label text. */
  label?: string;
  /** Optional custom content to render inside the splash. */
  children?: ReactNode;
}

const SplashScreen: FC<Props> = ({
  assets = [],
  minDurationMs = 750,
  delayMs = 0,
  label = "Loading",
  children,
}: Props) => {
  const { setShowView } = useViewStore();

  // Track visibility and timings
  const [visible, setVisible] = useState<boolean>(true);
  const mountedAtRef = useRef<number>(Date.now());
  const hideTimerRef = useRef<number | null>(null);

  const allLoaded = useMemo(() => assets.every(Boolean), [assets]);

  // Hide only after assets are loaded and min duration has elapsed
  useEffect(() => {
    const clearTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    if (!allLoaded) {
      // Ensure we remain visible while loading
      clearTimer();
      if (!visible) setVisible(true);
      return () => clearTimer();
    }

    const elapsed = Date.now() - mountedAtRef.current;
    const wait = Math.max(minDurationMs - elapsed, 0) + Math.max(delayMs, 0);

    clearTimer();
    hideTimerRef.current = window.setTimeout(() => setVisible(false), wait);

    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLoaded, minDurationMs, delayMs]);

  // Inform the view store when content should be shown
  useEffect(() => {
    setShowView(!visible);
  }, [setShowView, visible]);

  // Stop page scroll while visible
  useEffect(() => {
    const original = document.body.style.overflow;
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "auto";
    return () => {
      document.body.style.overflow = original || "auto";
    };
  }, [visible]);

  const variants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as const;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/70"
          role="status"
          aria-live="polite"
          aria-busy={visible}
          aria-label={label}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children ?? (
            <div className="text-white/90 text-sm tracking-wider">{label}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
