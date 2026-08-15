"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SIZE = 84; // px, the sprite box
const SPEED = 105; // px per second

/* Flip if the source animation faces left instead of right. */
const FACES_RIGHT = true;

/* A run-cycle sprite that jogs along the top edge of the projects grid and
   turns around (mirrored) when it reaches either end. */
export function LottieRunner({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const travel = Math.max(0, width - SIZE);
  const duration = (travel * 2) / SPEED; // out and back
  const base = FACES_RIGHT ? 1 : -1;

  return (
    <div
      ref={hostRef}
      className={`relative h-[84px] w-full ${className}`}
      aria-hidden
    >
      {travel > 0 && (
        <motion.div
          className="absolute bottom-0 left-0"
          style={{ width: SIZE, height: SIZE }}
          animate={
            reduce
              ? { x: 0, scaleX: base }
              : { x: [0, travel, 0], scaleX: [base, base, -base, -base] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  x: {
                    duration,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scaleX: {
                    duration,
                    times: [0, 0.49, 0.5, 1],
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
          }
        >
          <DotLottieReact
            src="/images/run_cycle.lottie"
            autoplay
            loop
            style={{ width: SIZE, height: SIZE }}
          />
        </motion.div>
      )}

      {/* the ground the runner jogs on */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-rule" />
    </div>
  );
}
