"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { skillGroups } from "@/data/resume";
import { BurstBadge } from "@/components/burst-badge";

const spring = { type: "spring" as const, stiffness: 120, damping: 14 };

/* per-panel look: alternating cream / dark, with a gentle comic tilt */
const VARIANTS = ["cream", "dark", "dark", "cream", "cream", "dark"] as const;
const ROTATES = [-1.5, 1.5, 1.5, -1.5, -1.5, 1.5];

function Sparkle({
  className = "",
  size = 18,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute select-none text-accent-500 ${className}`}
      style={{ fontSize: size }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.1, 0.85], rotate: [0, 15, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      ✦
    </motion.span>
  );
}

function SkillPanel({
  no,
  label,
  Icon,
  items,
  variant,
  rotate,
}: {
  no: string;
  label: string;
  Icon: LucideIcon;
  items: string[];
  variant: "cream" | "dark";
  rotate: number;
}) {
  const cream = variant === "cream";
  return (
    <motion.article
      initial={{ opacity: 0, y: 42, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={spring}
      className={`relative border-2 px-6 pt-10 pb-6 shadow-[7px_7px_0_0_var(--accent-500)] sm:px-7 ${
        cream
          ? "border-[color:var(--band-foreground)] bg-band"
          : "border-ink bg-card"
      }`}
    >
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.16]"
        aria-hidden
      />

      {/* manga caption box: icon · number · label */}
      <div className="absolute -top-3.5 left-4 flex items-center gap-2 border-2 border-ink bg-accent-500 px-3 py-1 shadow-[3px_3px_0_0_var(--ink)]">
        <Icon size={14} className="text-band-foreground" />
        <span className="font-comic text-sm tracking-wide text-band-foreground">{no}</span>
        <span className="h-3 w-px bg-black/25" />
        <span className="font-comic text-sm tracking-wide text-band-foreground">{label}</span>
      </div>

      {/* skill chips */}
      <div className="relative mt-2 flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <motion.span
            key={item}
            whileHover={{ 
              scale: 1.15, 
              rotate: (idx % 2 === 0 ? 5 : -5),
              y: -3
            }}
            whileTap={{ scale: 0.8, rotate: -10 }}
            className={`cursor-pointer px-2.5 py-1 font-mono text-[11px] font-semibold text-band-foreground transition-all duration-200 ${
              cream
                ? "border-2 border-black/20 hover:border-ink hover:bg-accent-500 hover:shadow-[3px_3px_0_0_var(--ink)]"
                : "border-2 border-ink bg-band hover:bg-accent-500 hover:shadow-[3px_3px_0_0_var(--ink)]"
            }`}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}

export function SkillsArsenal() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24">
      <Sparkle className="left-[8%] top-[16%]" size={22} delay={0} />
      <Sparkle className="right-[10%] top-[11%]" size={14} delay={1.1} />
      <Sparkle className="right-[6%] top-[52%]" size={18} delay={0.7} />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ---- title splash ---- */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 text-center sm:mb-20"
        >
          <div className="speed-lines absolute inset-0" aria-hidden />
          
          {/* Funny floating comic bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
            className="absolute -top-12 left-[10%] sm:left-[25%] z-20 hidden sm:block"
          >
            <div className="relative rounded-2xl border-2 border-ink bg-band px-4 py-2 shadow-[4px_4px_0_0_var(--accent-500)]">
              <p className="font-comic text-sm tracking-wide text-band-foreground">
                "I know Kung Fu... and React."
              </p>
              <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-r-2 border-b-2 border-ink bg-band" />
            </div>
          </motion.div>

          <div className="relative flex justify-center">
            <BurstBadge className="rotate-[-3deg] border-2 border-ink hover:rotate-12 transition-transform cursor-pointer">
              ISSUE #01
            </BurstBadge>
          </div>
          <p className="relative mt-4 font-mono text-[11px] tracking-[0.4em] text-ink-muted uppercase">
            Powers &amp; Abilities
          </p>
          <motion.h1
            initial={{ opacity: 0, scale: 1.25, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 }}
            className="relative mt-3 font-comic text-5xl leading-[0.9] tracking-wide text-ink sm:text-7xl cursor-crosshair"
            style={{
              textShadow:
                "3px 3px 0 var(--accent-500), 6px 6px 0 rgba(0,0,0,0.35)",
            }}
          >
            Skills &amp; Arsenal
          </motion.h1>
          <p className="relative mt-5 font-mono text-[11px] tracking-[0.15em] text-ink-muted">
            The tools I trust{" "}
            <span className="text-accent-500 font-bold">
              (plus a few I&apos;m still negotiating with)
            </span>
            .
          </p>
        </motion.header>

        {/* ---- arsenal panels ---- */}
        <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-10">
          {skillGroups.map((group, i) => (
            <SkillPanel
              key={group.label}
              no={String(i + 1).padStart(2, "0")}
              label={group.label.toUpperCase()}
              Icon={group.icon}
              items={group.items}
              variant={VARIANTS[i % VARIANTS.length]}
              rotate={ROTATES[i % ROTATES.length]}
            />
          ))}
        </div>

        {/* ---- footer ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-comic text-2xl tracking-wide text-ink-muted sm:text-3xl">
            Now let&apos;s see them in action.
          </p>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 border-2 border-ink bg-band px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-band-foreground uppercase shadow-[4px_4px_0_0_var(--accent-500)] transition-transform hover:-translate-y-0.5"
          >
            Field missions
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
