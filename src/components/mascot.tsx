"use client";

import { motion, useReducedMotion } from "framer-motion";

const OUTLINE = "#17120f";
const BODY = "#f4efe4";
const LID = "#2b2521";
const COFFEE = "#6f4a2f";

/* A tiny chibi mascot hunched over a laptop, typing, with a cold coffee beside
   it. Floats, blinks, taps the keys, and sweats a little (hard at work).
   Cheeks, laptop logo and the straw use the season accent. */
export function Mascot({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const blink = reduce
    ? {}
    : {
        animate: { scaleY: [1, 1, 0.15, 1] },
        transition: {
          duration: 0.35,
          times: [0, 0.85, 0.92, 1],
          repeat: Infinity,
          repeatDelay: 2.8,
          ease: "easeInOut" as const,
        },
        style: { transformBox: "fill-box", transformOrigin: "center" } as const,
      };

  const tap = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -2.5, 0] },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="150"
        height="132"
        viewBox="0 0 180 150"
        fill="none"
        role="img"
        aria-label="A little chibi mascot coding on a laptop with cold coffee"
      >
        {/* ---- cold coffee cup (left) ---- */}
        {/* cup body */}
        <path d="M12 74 h30 l-4 50 a4 4 0 0 1 -4 3 h-14 a4 4 0 0 1 -4 -3 z" fill={BODY} stroke={OUTLINE} strokeWidth="3" />
        {/* iced coffee */}
        <path d="M15 92 h24 l-3 32 a3 3 0 0 1 -3 3 h-12 a3 3 0 0 1 -3 -3 z" fill={COFFEE} />
        {/* dome lid */}
        <path d="M9 74 Q 27 58 45 74 Z" fill={BODY} stroke={OUTLINE} strokeWidth="3" strokeLinejoin="round" />
        {/* straw */}
        <line x1="34" y1="66" x2="44" y2="40" stroke="var(--accent-500)" strokeWidth="4" strokeLinecap="round" />

        {/* ---- body / shoulders (behind laptop) ---- */}
        <ellipse cx="100" cy="98" rx="40" ry="24" fill={BODY} stroke={OUTLINE} strokeWidth="3.5" />

        {/* ---- head ---- */}
        <circle cx="100" cy="52" r="32" fill={BODY} stroke={OUTLINE} strokeWidth="3.5" />
        {/* top bun */}
        <circle cx="100" cy="17" r="11" fill={OUTLINE} />
        <circle cx="100" cy="17" r="4" fill="var(--accent-500)" opacity="0.9" />
        {/* bangs */}
        <path d="M70 50 Q 72 20 100 22 Q 128 20 130 50 Q 115 36 100 41 Q 85 46 70 50 Z" fill={OUTLINE} />

        {/* cheeks */}
        <circle cx="78" cy="60" r="5.5" fill="var(--accent-500)" opacity="0.85" />
        <circle cx="122" cy="60" r="5.5" fill="var(--accent-500)" opacity="0.85" />

        {/* eyes (blink) + shine */}
        <motion.ellipse cx="88" cy="53" rx="5" ry="6.5" fill={OUTLINE} {...blink} />
        <motion.ellipse cx="112" cy="53" rx="5" ry="6.5" fill={OUTLINE} {...blink} />
        <circle cx="90" cy="50" r="1.8" fill="#fff" />
        <circle cx="114" cy="50" r="1.8" fill="#fff" />

        {/* determined grin */}
        <path d="M92 64 Q 100 73 108 64 Q 100 68 92 64 Z" fill={OUTLINE} />

        {/* sweat drop (hard at work) */}
        {!reduce && (
          <motion.path
            d="M133 42 q 4.5 7 0 11 q -4.5 -4 0 -11 Z"
            fill="#bfe3ff"
            stroke={OUTLINE}
            strokeWidth="1.5"
            animate={{ opacity: [0, 1, 1, 0], y: [0, 2, 5, 8] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeIn", repeatDelay: 0.6 }}
          />
        )}

        {/* ---- laptop (back of the lid, facing us) ---- */}
        <path
          d="M58 140 L64 100 a3 3 0 0 1 3 -2.5 h66 a3 3 0 0 1 3 2.5 L145 140 Z"
          fill={LID}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* logo */}
        <circle cx="101.5" cy="120" r="8" fill="var(--accent-500)" />
        <circle cx="101.5" cy="120" r="3" fill={LID} />

        {/* typing hands peeking over the top edge */}
        <motion.circle cx="74" cy="97" r="6.5" fill={BODY} stroke={OUTLINE} strokeWidth="3" {...tap(0)} />
        <motion.circle cx="129" cy="97" r="6.5" fill={BODY} stroke={OUTLINE} strokeWidth="3" {...tap(0.25)} />
      </svg>
    </motion.div>
  );
}
