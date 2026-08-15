"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Particles, type Variant } from "@/components/particles";

type ChapterProps = {
  number: string;
  label: string;
  title: string;
  kicker?: string;
  pageNumber?: string;
  accent?: boolean;
  wide?: boolean;
  particles?: Variant;
  children: ReactNode;
};

export function Chapter({
  number,
  label,
  title,
  kicker,
  pageNumber,
  accent,
  wide,
  particles,
  children,
}: ChapterProps) {
  return (
    <section className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden px-6 py-14 sm:px-12 sm:py-20">
      {particles && <Particles variant={particles} />}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 mx-auto w-full border bg-card shadow-[6px_6px_0_0_var(--rule)] ${
          wide ? "max-w-4xl" : "max-w-2xl"
        } ${accent ? "border-accent-500" : "border-rule"}`}
      >
        <div
          className={`relative flex items-center gap-3 overflow-hidden px-5 py-2.5 sm:px-8 ${
            accent ? "bg-accent-500 text-band-foreground" : "bg-band text-band-foreground"
          }`}
        >
          <div className="halftone pointer-events-none absolute inset-0" aria-hidden />
          <span className="relative font-mono text-xs tracking-[0.3em]">
            ISSUE #{number}
          </span>
          <span className="relative h-3 w-px bg-current opacity-30" />
          <span className="relative font-mono text-xs tracking-[0.3em] uppercase">
            {label}
          </span>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {kicker && (
            <p className="mb-3 font-mono text-xs tracking-widest text-ink-muted uppercase">
              {kicker}
            </p>
          )}
          <h2 className="font-comic text-4xl leading-tight tracking-wide text-ink sm:text-5xl">
            {title}
          </h2>
          <div className="mt-3 h-[3px] w-14 bg-accent-500" />
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {children}
          </div>
        </div>
      </motion.div>

      {pageNumber && (
        <p className="relative z-10 mt-4 text-center font-mono text-xs tracking-widest text-ink-muted">
          — {pageNumber} —
        </p>
      )}
    </section>
  );
}
