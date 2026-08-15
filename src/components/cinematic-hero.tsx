"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { SeasonBackdrop, STAGE } from "@/components/season-backdrop";
import { SeasonParticles } from "@/components/season-particles";
import { SeasonSelector } from "@/components/season-selector";
import { NameIntro } from "@/components/name-intro";
import { HandwrittenNote } from "@/components/handwritten-note";
import { useSeason } from "@/components/season-provider";
import { seasons } from "@/data/seasons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.9 } },
};

const maskReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const maskRevealCalm = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* anime-style: slides in hard from the left with a slight overshoot */
const slashIn = {
  hidden: { opacity: 0, x: -60, skewX: 8 },
  show: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { type: "spring" as const, stiffness: 190, damping: 17, mass: 0.8 },
  },
};

function MagneticLink({
  href,
  children,
  className,
  disabled,
  style,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    </motion.div>
  );
}

export function CinematicHero() {
  const { season, setSeason } = useSeason();
  const reduceMotion = useReducedMotion();
  const accent = seasons.find((s) => s.id === season)?.accent ?? "#ff8fb3";

  const containerVariant = reduceMotion ? { hidden: {}, show: {} } : container;
  const textVariant = reduceMotion ? maskRevealCalm : maskReveal;

  return (
    <div
      /* Fixed height + overflow-hidden: the hero is exactly one screen and the
         page never scrolls vertically. */
      className="relative h-[calc(100dvh-65px)] overflow-hidden"
      style={{ backgroundColor: STAGE }}
    >
      {/* season-tinted ambient wash across the whole stage */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(120% 90% at 78% 45%, ${accent}1f, transparent 62%)`,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      <SeasonParticles season={season} />

      {/* Artwork: right side on desktop, lower half on mobile. */}
      <div className="absolute inset-x-0 bottom-0 top-[46%] lg:inset-y-0 lg:left-[34%] lg:right-0 lg:top-0">
        <SeasonBackdrop season={season} />
      </div>

      {/* Left column */}
      <div className="relative z-30 flex h-full flex-col justify-start px-6 pt-8 sm:px-10 lg:mx-auto lg:max-w-7xl lg:justify-center lg:pt-0 lg:pl-12">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
          className="relative w-full lg:max-w-[30rem]"
        >
          {/* vertical accent rule */}
          <motion.div
            aria-hidden
            className="absolute -left-4 top-1 bottom-1 hidden w-px lg:block"
            animate={{
              background: `linear-gradient(to bottom, transparent, ${accent}cc 22%, ${accent}55 60%, transparent)`,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Identity mark: greeting metadata, morphing name, role + dots. */}
          <NameIntro
            variant="hero"
            role="Full Stack Developer"
            startDelay={reduceMotion ? 0 : 0.7}
          />

          {/* editorial descriptor — disciplines, not a tech stack */}
          <motion.p
            variants={textVariant}
            className="mt-6 font-mono text-[10px] tracking-[0.34em] text-white/45 uppercase sm:text-[11px]"
          >
            Research <span className="text-white/25">·</span> Systems{" "}
            <span className="text-white/25">·</span> Product{" "}
            <span className="text-white/25">·</span> Code
          </motion.p>

          {/* a short personal note, written by hand (desktop only) */}
          <div className="mt-6 hidden sm:block">
            <HandwrittenNote
              text={"Curious by nature.\nRelentless by choice.\nI research the problem before I build the solution."}
              startDelay={reduceMotion ? 0 : 1.6}
              perChar={0.023}
              className="text-[1.5rem] leading-[1.5] text-white/80"
            />
            <HandwrittenNote
              text={"Give me a problem, a little time, and the right stack —\nI'll go deeper than expected."}
              startDelay={reduceMotion ? 0 : 3.7}
              perChar={0.017}
              className="mt-3 max-w-sm text-lg leading-snug text-white/45"
            />
          </div>

          {/* CTAs — the primary carries the weight */}
          <motion.div
            variants={textVariant}
            className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <MagneticLink
              href="/projects"
              disabled={!!reduceMotion}
              style={{ "--accent": accent } as React.CSSProperties}
              className="group inline-flex items-center gap-2.5 border border-white bg-white px-6 py-3 font-mono text-[10px] tracking-[0.24em] text-[#0d0b0a] uppercase transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0d0b0a] sm:text-[11px]"
            >
              Explore my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticLink>
            <MagneticLink
              href="/about"
              disabled={!!reduceMotion}
              className="group inline-flex items-center gap-2.5 border border-white/25 px-6 py-3 font-mono text-[10px] tracking-[0.24em] text-white/70 uppercase transition-colors duration-300 hover:border-white/60 hover:text-white sm:text-[11px]"
            >
              Origin
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticLink>
          </motion.div>

          {/* research-mindset metadata (desktop only) */}
          <motion.p
            variants={textVariant}
            className="mt-6 hidden font-mono text-[9px] tracking-[0.34em] text-white/30 uppercase sm:block sm:text-[10px]"
          >
            Approach <span className="text-white/20">/</span> Research{" "}
            <span style={{ color: accent }}>→</span> Build{" "}
            <span style={{ color: accent }}>→</span> Refine
          </motion.p>

          <motion.div variants={textVariant} className="mt-6 sm:mt-7">
            <SeasonSelector season={season} onChange={setSeason} />
          </motion.div>
        </motion.div>
      </div>

      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: STAGE }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.3, 0.75, 1] }}
            className="font-mono text-xs tracking-[0.4em] text-white/70 uppercase"
          >
            Esha Kar
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
