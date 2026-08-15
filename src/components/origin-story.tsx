"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BurstBadge } from "@/components/burst-badge";
import { Mascot } from "@/components/mascot";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const spring = { type: "spring" as const, stiffness: 120, damping: 14 };

/* Clicking the coffee button doesn't take money — it just says thanks, loudly. */
const COFFEE_REPLIES = [
  "Thanks for even THINKING about it — my cat just purred in gratitude. 🐱",
  "Aww, you almost paid for caffeine! That's basically a hug with a price tag.",
  "Payment declined by me. Your good vibes already cleared the transaction. ✨",
  "The thought alone gave me +10 XP. No wallet harmed in the process.",
  "Cold coffee acquired… emotionally. That counts, right?",
  "You clicked. I felt it. Somewhere a deploy just passed CI. 🚀",
  "Kind gesture detected. Converting to serotonin… done. ☕",
  "No payment needed — but I'm framing this click as fan mail.",
  "Sweet of you! Save the money, send me a bug report instead. 🐛",
  "Error 402: Payment Not Required. Wholesomeness accepted instead.",
];

/* A little twinkling star for anime sparkle. */
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

/* One manga panel: caption box + halftone screentone, cream or dark, tilted. */
function Panel({
  no,
  title,
  variant,
  rotate,
  children,
}: {
  no: string;
  title: string;
  variant: "cream" | "dark";
  rotate: number;
  children: ReactNode;
}) {
  const cream = variant === "cream";
  return (
    <motion.article
      initial={{ opacity: 0, y: 46, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={spring}
      className={`relative border-2 border-ink px-6 pt-8 pb-6 shadow-[7px_7px_0_0_var(--accent-500)] sm:px-7 sm:pt-9 ${
        cream ? "bg-band text-band-foreground" : "bg-card text-ink"
      }`}
    >
      <div
        className="halftone pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
      />

      {/* manga caption box */}
      <div className="absolute -top-3.5 left-4 flex items-center gap-2 border-2 border-ink bg-accent-500 px-3 py-0.5 shadow-[3px_3px_0_0_var(--ink)]">
        <span className="font-comic text-sm tracking-wide text-band-foreground">{no}</span>
        <span className="h-3 w-px bg-black/25" />
        <span className="font-comic text-sm tracking-wide text-band-foreground">{title}</span>
      </div>

      <p
        className={`relative text-[15px] leading-relaxed sm:text-base ${
          cream ? "text-band-foreground/85" : "text-ink-muted"
        }`}
      >
        {children}
      </p>
    </motion.article>
  );
}

/* The "Buy me cold coffee" button. It takes no money — it pops a comic speech
   bubble thanking you for the thought, cycling a new line on every click. */
function CoffeeInteraction() {
  const [replyIndex, setReplyIndex] = useState<number | null>(null);
  // -1 until the first click, which seeds a random starting line.
  const nextRef = useRef(-1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function pour() {
    if (nextRef.current < 0) {
      nextRef.current = Math.floor(Math.random() * COFFEE_REPLIES.length);
    }
    setReplyIndex(nextRef.current);
    nextRef.current = (nextRef.current + 1) % COFFEE_REPLIES.length;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setReplyIndex(null), 6000);
  }

  return (
    /* Both side columns get the SAME fixed width so the cat stays dead centre
       whether or not a reply bubble is showing. */
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
      {/* 1. BUTTON (Left on desktop, Top on mobile) */}
      <div className="flex w-full flex-col items-center gap-2 sm:w-[19rem] sm:shrink-0 sm:items-end">
        <motion.button
          type="button"
          onClick={pour}
          whileTap={{ scale: 0.95 }}
          aria-label="Buy me cold coffee"
          className="relative cursor-pointer overflow-hidden rounded-full border-2 border-ink bg-band px-8 py-4 shadow-[6px_6px_0_0_var(--accent-500)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--accent-500)] active:shadow-none"
        >
          <div className="speed-lines absolute inset-0 opacity-20" aria-hidden />
          <div className="relative z-10 flex items-center gap-3">
            <motion.span
              className="text-xl"
              animate={replyIndex !== null ? { rotate: [0, -18, 14, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              🧋
            </motion.span>
            <span className="font-comic text-lg font-bold tracking-wide text-band-foreground sm:text-xl whitespace-nowrap">
              Buy me cold coffee!
            </span>
          </div>
        </motion.button>

        {/* nudge, until they've clicked once */}
        <AnimatePresence>
          {replyIndex === null && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase"
            >
              go on, press it
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* 2. CAT (Middle) */}
      <motion.div
        className="group relative h-48 w-48 shrink-0 sm:h-56 sm:w-56"
        animate={replyIndex !== null ? { y: [0, -16, 0, -6, 0] } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-accent-500/20 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-500/40" />
        <DotLottieReact
          src="/images/Boba Neko.lottie"
          loop
          autoplay
          className="relative z-10 h-full w-full drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-2"
        />
      </motion.div>

      {/* 3. MESSAGE (Right on desktop, Bottom on mobile) */}
      <div className="flex min-h-[7.5rem] w-full items-center justify-center sm:w-[19rem] sm:shrink-0 sm:justify-start">
        <AnimatePresence mode="wait">
          {replyIndex !== null && (
            <motion.div
              key={replyIndex}
              initial={{ opacity: 0, x: -20, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 2 }}
              exit={{ opacity: 0, x: -10, scale: 0.85 }}
              transition={spring}
              className="relative z-20 w-[17rem] sm:w-full"
            >
              <div
                role="status"
                aria-live="polite"
                className="relative border-2 border-ink bg-card px-5 py-4 text-center shadow-[6px_6px_0_0_var(--accent-500)]"
              >
                <p className="font-comic text-base leading-snug text-ink sm:text-lg">
                  {COFFEE_REPLIES[replyIndex]}
                </p>
                {/* the bubble tail, pointing left toward the cat (on desktop) or up (on mobile) */}
                <span
                  aria-hidden
                  className="hidden sm:block absolute right-full top-1/2 -mt-3 h-0 w-0 border-y-[12px] border-r-[14px] border-y-transparent border-r-ink"
                />
                <span
                  aria-hidden
                  className="hidden sm:block absolute right-full top-1/2 -mt-2 h-0 w-0 border-y-[8px] border-r-[10px] border-y-transparent border-r-card"
                />
                
                {/* tail pointing up for mobile layout */}
                <span
                  aria-hidden
                  className="sm:hidden absolute bottom-full left-1/2 -ml-3 h-0 w-0 border-x-[12px] border-b-[14px] border-x-transparent border-b-ink"
                />
                <span
                  aria-hidden
                  className="sm:hidden absolute bottom-full left-1/2 -ml-2 h-0 w-0 border-x-[8px] border-b-[10px] border-x-transparent border-b-card"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function OriginStory() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24">
      {/* scattered anime sparkles */}
      <Sparkle className="left-[8%] top-[18%]" size={22} delay={0} />
      <Sparkle className="right-[10%] top-[12%]" size={14} delay={1.1} />
      <Sparkle className="left-[14%] top-[62%]" size={16} delay={0.6} />
      <Sparkle className="right-[8%] top-[68%]" size={20} delay={1.6} />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 sm:gap-10">
        {/* ---- title splash ---- */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-2 text-center sm:mb-4"
        >
          <div className="speed-lines absolute inset-0" aria-hidden />
          <div className="relative flex justify-center">
            <BurstBadge className="rotate-[-3deg] border-2 border-ink">
              CHAPTER 00
            </BurstBadge>
          </div>
          <p className="relative mt-4 font-mono text-[11px] tracking-[0.4em] text-ink-muted uppercase">
            My origin story
          </p>
          <motion.h1
            initial={{ opacity: 0, scale: 1.3, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 }}
            className="relative mt-3 font-comic text-6xl leading-[0.9] tracking-wide text-ink sm:text-8xl"
            style={{
              textShadow:
                "3px 3px 0 var(--accent-500), 6px 6px 0 rgba(0,0,0,0.35)",
            }}
          >
            Origin Story
          </motion.h1>
          <p className="relative mt-5 font-mono text-[11px] tracking-[0.15em] text-ink-muted">
            Est. West Bengal · powered by curiosity{" "}
            <span className="text-accent-500">(and far too much chai)</span>.
          </p>
        </motion.header>

        {/* ---- lead-in panels ---- */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
          <Panel no="01" title="ROOTS" variant="cream" rotate={-1.5}>
            I&apos;m a West Bengal kid — government school, oversized dreams, and
            temperamental Wi-Fi. My first love was language: I read{" "}
            <strong className="font-semibold text-band-foreground">
              English Honours
            </strong>{" "}
            long before I met my first line of code.
          </Panel>
          <Panel no="02" title="THE TURN" variant="dark" rotate={1.5}>
            Then tech grabbed me by the collar and refused to let go. I chose{" "}
            <strong className="font-semibold text-ink">BCA</strong> to chase it
            properly — and was shipping real code, in real jobs, before the degree
            even finished loading.
          </Panel>
        </div>

        {/* ---- CENTER OF ATTRACTION: speech-bubble manifesto ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 150, damping: 11 }}
          className="relative my-4 w-full"
        >
          <Sparkle className="-left-2 -top-4" size={26} delay={0.2} />
          <Sparkle className="right-6 -top-5" size={16} delay={0.9} />
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-accent-500 px-8 py-9 text-band-foreground shadow-[10px_10px_0_0_var(--ink)] sm:px-12 sm:py-12">
            <div className="speed-lines absolute inset-0 opacity-90" aria-hidden />
            <div className="halftone absolute inset-0 opacity-15" aria-hidden />
            <BurstBadge className="absolute top-5 right-5 rotate-[8deg] border-2 border-ink text-[11px]">
              MY CODE
            </BurstBadge>
            <p className="relative font-comic text-3xl leading-[1.15] tracking-wide sm:text-5xl">
              &ldquo;Give me a problem, a little time, and the right stack —{" "}
              <span
                className="bg-band px-1.5 text-band-foreground"
                style={{
                  boxDecorationBreak: "clone",
                  WebkitBoxDecorationBreak: "clone",
                }}
              >
                I&apos;ll go deeper than you expect.
              </span>
              &rdquo;
            </p>
          </div>
          {/* speech-bubble tail */}
          <div className="absolute -bottom-[11px] left-14 h-6 w-6 rotate-45 border-r-2 border-b-2 border-ink bg-accent-500" />
        </motion.div>

        {/* ---- follow-through panels ---- */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
          <Panel no="03" title="THE METHOD" variant="dark" rotate={1.5}>
            I don&apos;t just close tickets — I{" "}
            <strong className="font-semibold text-ink">investigate</strong>.
            Research, experiment, rebuild, repeat… until it&apos;s genuinely
            right. &ldquo;Good enough&rdquo; and I aren&apos;t on speaking terms.
          </Panel>
          <Panel no="04" title="THE FIRE" variant="cream" rotate={-1.5}>
            I&apos;ve had my share of plot twists; none of them dimmed the
            ambition. The deeper I understand a technology, the more I want to
            build with it — and the further I&apos;ll go.
          </Panel>
        </div>

        {/* the mascot & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-12"
        >
          {/* Boba Neko Lottie & interactive button (now rendered together in a 3-col layout) */}
          <CoffeeInteraction />

          {/* the call to action */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-comic text-2xl tracking-wide text-ink-muted sm:text-3xl">
              To be continued…
            </p>
            <Link
              href="/skills"
              className="group inline-flex items-center gap-2 border-2 border-ink bg-band px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-band-foreground uppercase shadow-[4px_4px_0_0_var(--accent-500)] transition-transform hover:-translate-y-0.5"
            >
              See what I build
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
