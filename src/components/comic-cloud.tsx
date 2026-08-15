"use client";

import { motion, useReducedMotion } from "framer-motion";

/* A comic thought-cloud that pops OUTSIDE the projects grid on hover.

   The cloud is a union of circles. SVG can't stroke a union, so we draw the
   circles twice: pass 1 with a double-width stroke, pass 2 fill-only on top —
   the second pass paints over every stroke segment that falls inside a
   neighbouring circle, leaving only the outer scalloped edge. */

const PUFFS = [
  { cx: 110, cy: 78, r: 46 },
  { cx: 52, cy: 86, r: 33 },
  { cx: 170, cy: 84, r: 34 },
  { cx: 74, cy: 48, r: 31 },
  { cx: 148, cy: 46, r: 33 },
  { cx: 76, cy: 110, r: 29 },
  { cx: 146, cy: 112, r: 30 },
  // tail, drifting down-right toward the card
  { cx: 202, cy: 132, r: 12 },
  { cx: 224, cy: 152, r: 6 },
];

export const cloudMessages = [
  "Shipped at 2 AM, powered by chai.",
  "404: excuses not found.",
  "git push origin courage",
  "console.log('you got this')",
  "Small commits. Big dreams.",
  "It works on prod too. Promise.",
  "Deploy first, panic later.",
  "One more feature… okay, two.",
  "Built with love, tears & retries.",
  "Bugs fear me. Mostly.",
  "Coffee in. Features out.",
  "Done beats perfect. Ship it!",
];

type Props = {
  message: string;
  /** Which side of the card the cloud pops out on. */
  side: "left" | "right";
};

export function ComicCloud({ message, side }: Props) {
  const reduce = useReducedMotion();
  const outward = side === "left" ? -1 : 1;

  if (reduce) {
    return (
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-8 z-30 hidden h-[184px] w-[260px] xl:block"
        style={
          side === "left"
            ? { right: "calc(100% - 28px)" }
            : { left: "calc(100% - 28px)" }
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <CloudArt message={message} side={side} />
      </motion.div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -top-8 z-30 hidden h-[184px] w-[260px] xl:block"
      style={
        side === "left"
          ? { right: "calc(100% - 28px)" }
          : { left: "calc(100% - 28px)" }
      }
      initial={{
        opacity: 0,
        scale: 0.4,
        x: -outward * 24,
        y: 18,
        rotate: outward * 8,
      }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: outward * -3 }}
      exit={{
        opacity: 0,
        scale: 0.4,
        x: -outward * 20,
        y: 14,
        rotate: outward * 8,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.6 }}
    >
      <CloudArt message={message} side={side} />
    </motion.div>
  );
}

function CloudArt({ message, side }: Props) {
  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 240 170"
        className="h-full w-full drop-shadow-[4px_5px_0_var(--rule)]"
        style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}
      >
        <g fill="var(--card)" stroke="var(--ink)" strokeWidth="6">
          {PUFFS.map((p, i) => (
            <circle key={`s${i}`} {...p} />
          ))}
        </g>
        <g fill="var(--card)">
          {PUFFS.map((p, i) => (
            <circle key={`f${i}`} {...p} />
          ))}
        </g>
        {/* a couple of accent sparkles inside the cloud */}
        <circle cx="60" cy="52" r="3" fill="var(--accent-500)" />
        <circle cx="166" cy="116" r="2.5" fill="var(--accent-500)" />
      </svg>

      <p
        className={`absolute top-[20%] bottom-[30%] flex items-center justify-center text-center text-[17px] leading-tight font-bold text-ink ${
          side === "left" ? "left-[16%] right-[24%]" : "left-[24%] right-[16%]"
        }`}
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        {message}
      </p>
    </div>
  );
}
