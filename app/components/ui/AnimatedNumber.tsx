"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  /** Format the animated value into a display string. */
  format?: (v: number) => string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
  /** Animate only the first time it scrolls into view (default), or every value change. */
  live?: boolean;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up to `value` with an easing curve. In "live" mode it re-animates
 * from the previous value whenever `value` changes (used by the simulator);
 * otherwise it animates once when first scrolled into view.
 */
export default function AnimatedNumber({
  value,
  format = (v) => v.toFixed(0),
  duration = 1100,
  className = "",
  live = false,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const fromRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [display, setDisplay] = useState(0);
  const [armed, setArmed] = useState(live);

  // For the one-shot (scroll-in) variant, wait until visible.
  useEffect(() => {
    if (live) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [live]);

  useEffect(() => {
    if (!armed) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const from = fromRef.current;
    const to = value;
    if (reduce) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOut(t);
      setDisplay(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, armed, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
