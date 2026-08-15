"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type NameEntry = {
  id: string;
  /* language name written in its own script */
  label: string;
  /* a greeting in that language, used as the kicker */
  greeting: string;
  name: string;
  /* sans face — used by the /about page variant and the greeting metadata */
  font: string;
  /* editorial serif face — used by the hero identity mark */
  serifFont: string;
  /* Latin scripts get the per-letter "write-on"; others reveal as one word
     so combining marks (Bengali matras, etc.) never split apart. */
  latin?: boolean;
};

const NAMES: NameEntry[] = [
  {
    id: "en",
    label: "English",
    greeting: "Hello",
    name: "ESHA KAR",
    font: "var(--font-bangers)",
    serifFont: "var(--font-fraunces)",
    latin: true,
  },
  {
    id: "bn",
    label: "বাংলা",
    greeting: "নমস্কার",
    name: "এশা কর",
    font: "var(--font-noto-bengali)",
    serifFont: "var(--font-serif-bn)",
  },
  {
    id: "hi",
    label: "हिन्दी",
    greeting: "नमस्ते",
    name: "एशा कर",
    font: "var(--font-noto-devanagari)",
    serifFont: "var(--font-serif-hi)",
  },
  {
    id: "ja",
    label: "日本語",
    greeting: "こんにちは",
    name: "エシャ・カル",
    /* System stacks — the katakana renders on any OS without bundling the
       very large Noto CJK web fonts (sans for /about, Mincho serif for hero). */
    font: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Yu Gothic UI", Meiryo, "Noto Sans JP", "Noto Sans CJK JP", sans-serif',
    serifFont:
      '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif JP", "Songti SC", serif',
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

/* Per-letter write-on for the Latin spelling — the first thing a visitor reads. */
function LetterReveal({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <span className="inline-flex">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          // A bare space inside an inline-block collapses, so reserve width.
          <span key={i} className="inline-block w-[0.34em]" aria-hidden />
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: base + i * 0.07, duration: 0.55, ease: easeOut }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ),
      )}
    </span>
  );
}

/* Whole-word blur-in for non-Latin scripts. */
function WordReveal({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 26, scale: 0.96, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay: base, duration: 0.6, ease: easeOut }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}

type NameIntroProps = {
  /* "hero": editorial identity mark, left-aligned. "page": centered showcase
     (used on /about) — unchanged. */
  variant?: "hero" | "page";
  /* Professional designation under the name (hero variant). */
  role?: string;
  /* Delay (s) before the very first write-on — lets an intro overlay clear. */
  startDelay?: number;
  className?: string;
};

export function NameIntro({
  variant = "page",
  role,
  startDelay = 0,
  className = "",
}: NameIntroProps) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [cycled, setCycled] = useState(false);
  const isHero = variant === "hero";

  useEffect(() => {
    if (reduce) return;
    // English holds a touch longer so its write-on lands before the cycle.
    const delay = i === 0 ? 3200 : 2600;
    const t = setTimeout(() => {
      setCycled(true);
      setI((v) => (v + 1) % NAMES.length);
    }, delay);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const cur = NAMES[i];
  // Only the opening beat waits for startDelay; later cycles snap right in.
  const base = !cycled && i === 0 ? startDelay : 0;

  const heroSize = "text-[2.9rem] leading-[1.02] sm:text-6xl xl:text-7xl";
  const pageSize = "text-5xl leading-none sm:text-6xl md:text-7xl";

  if (isHero) {
    return (
      <div className={`flex flex-col items-start text-left ${className}`}>
        {/* editorial metadata greeting: e.g.  HELLO / 01 — greeting and index
            transition together as one unit. */}
        <div className="flex h-4 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5"
            >
              <span
                style={cur.latin ? undefined : { fontFamily: cur.font }}
                className={`font-mono text-[10px] tracking-[0.42em] text-white/50 sm:text-[11px] ${
                  cur.latin ? "uppercase" : ""
                }`}
              >
                {cur.greeting}
              </span>
              <span
                aria-hidden
                className="font-mono text-[10px] tracking-[0.3em] text-white/25 sm:text-[11px]"
              >
                / {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the identity mark */}
        <div className="relative mt-4 flex min-h-[3.1rem] items-center justify-start sm:min-h-[4.25rem] xl:min-h-[5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              style={{
                fontFamily: cur.serifFont,
                letterSpacing: cur.latin ? "0.08em" : "normal",
              }}
              exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.3 } }}
              className={`font-medium text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)] ${heroSize}`}
            >
              {cur.latin ? (
                <LetterReveal text={cur.name} base={base} />
              ) : (
                <WordReveal text={cur.name} base={base} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* professional designation + four language-state dots */}
        {role && (
          <div className="mt-5 flex flex-col gap-2.5">
            <p className="font-mono text-[10px] tracking-[0.38em] text-white/60 uppercase sm:text-[11px]">
              {role}
            </p>
            <div className="flex items-center gap-2">
              {NAMES.map((n, idx) => (
                <span
                  key={n.id}
                  className={`h-[5px] rounded-full transition-all duration-500 ${
                    idx === i
                      ? "w-[5px] scale-125 bg-[var(--accent-500)]"
                      : "w-[5px] bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---- page variant (/about) — unchanged ---- */

  if (reduce) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-[11px] tracking-[0.4em] text-ink-muted uppercase">
          She is
        </p>
        {NAMES.map((n) => (
          <p
            key={n.id}
            style={{ fontFamily: n.font }}
            className="text-4xl font-bold tracking-wide text-ink sm:text-5xl"
          >
            {n.name}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex select-none flex-col items-center text-center ${className}`}>
      <div className="flex h-5 items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${cur.id}-greet`}
            style={{ fontFamily: cur.font }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-[13px] tracking-[0.3em] text-ink-muted"
          >
            {cur.greeting}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative mt-5 flex min-h-[4.5rem] items-center justify-center sm:min-h-[6.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            style={{ fontFamily: cur.font }}
            exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.3 } }}
            className={`font-bold tracking-wide text-ink ${pageSize}`}
          >
            {cur.latin ? (
              <LetterReveal text={cur.name} base={base} />
            ) : (
              <WordReveal text={cur.name} base={base} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        key={`${cur.id}-rule`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mt-5 h-[3px] w-36 origin-center bg-accent-500 sm:w-44"
      />

      <div className="mt-5 flex items-center gap-4">
        <div className="h-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${cur.id}-label`}
              style={{ fontFamily: cur.font }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-xs tracking-[0.2em] text-accent-500 uppercase"
            >
              {cur.label}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1.5">
          {NAMES.map((n, idx) => (
            <span
              key={n.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-5 bg-accent-500" : "w-1.5 bg-ink-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
