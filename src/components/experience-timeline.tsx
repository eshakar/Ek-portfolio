"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { experience } from "@/data/resume";
import { BurstBadge } from "@/components/burst-badge";

const spring = { type: "spring" as const, stiffness: 120, damping: 15 };

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

function AlternatingLogos({ logo, extraLogo, company }: { logo?: string; extraLogo?: string; company: string }) {
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    if (!extraLogo) return;
    const interval = setInterval(() => {
      setShowExtra((prev) => !prev);
    }, 3500); // toggle every 3.5 seconds
    return () => clearInterval(interval);
  }, [extraLogo]);

  if (!logo && !extraLogo) {
    return <span className="font-comic text-3xl text-band-foreground">{company.charAt(0)}</span>;
  }

  // If no extraLogo, just render the main logo statically
  if (!extraLogo) {
    return (
      <Image
        src={logo!}
        alt={`${company} logo`}
        width={68}
        height={68}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <AnimatePresence initial={false}>
        {!showExtra ? (
          <motion.div
            key="main-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={logo!}
              alt={`${company} logo`}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            key="extra-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center bg-white p-1.5"
          >
            <Image
              src={extraLogo}
              alt={`${company} extra logo`}
              width={68}
              height={68}
              className="h-full w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24">
      <Sparkle className="left-[8%] top-[15%]" size={22} delay={0} />
      <Sparkle className="right-[10%] top-[11%]" size={14} delay={1.1} />
      <Sparkle className="right-[7%] top-[55%]" size={18} delay={0.7} />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ---- title splash ---- */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-14 text-center sm:mb-20"
        >
          <div className="speed-lines absolute inset-0" aria-hidden />
          <div className="relative flex justify-center">
            <BurstBadge className="rotate-[-3deg] border-2 border-ink">
              ISSUE #03
            </BurstBadge>
          </div>
          <p className="relative mt-4 font-mono text-[11px] tracking-[0.4em] text-ink-muted uppercase">
            Where I&apos;ve shipped
          </p>
          <motion.h1
            initial={{ opacity: 0, scale: 1.25, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 }}
            className="relative mt-3 font-comic text-5xl leading-[0.9] tracking-wide text-ink sm:text-7xl"
            style={{
              textShadow: "3px 3px 0 var(--accent-500), 6px 6px 0 rgba(0,0,0,0.35)",
            }}
          >
            The Record
          </motion.h1>
          <p className="relative mt-5 font-mono text-[11px] tracking-[0.15em] text-ink-muted">
            Six teams · remote-first ·{" "}
            <span className="text-accent-500">always shipping</span>.
          </p>
        </motion.header>

        {/* ---- timeline ---- */}
        <div>
          {experience.map((job, i) => {
            const last = i === experience.length - 1;
            return (
              <motion.div
                key={`${job.company}-${job.role}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...spring, delay: (i % 3) * 0.05 }}
                className={`relative flex gap-4 sm:gap-6 ${last ? "" : "pb-8"}`}
              >
                {/* node column: logo + connector rail */}
                <div className="relative flex w-[54px] shrink-0 flex-col items-center sm:w-[68px]">
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="flex h-[54px] w-[54px] items-center justify-center overflow-hidden border-2 border-ink bg-band shadow-[3px_3px_0_0_var(--accent-500)] sm:h-[68px] sm:w-[68px]">
                      <AlternatingLogos logo={job.logo} extraLogo={job.extraLogo} company={job.company} />
                    </div>
                    {job.current && (
                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 animate-pulse rounded-full border-2 border-ink bg-accent-500 z-20" />
                    )}
                  </div>
                  {!last && (
                    <div className="mt-2 w-[3px] flex-1 rounded-full bg-accent-500/40" />
                  )}
                </div>

                {/* card wrapper for popping out elements */}
                <div className="relative mb-1 flex-1">
                  {job.current && (
                    <div className="absolute -top-32 -right-12 w-[160px] h-[160px] sm:-top-40 sm:-right-20 sm:w-[200px] sm:h-[200px] z-30 pointer-events-none drop-shadow-[3px_3px_0_var(--rule)]">
                      <DotLottieReact
                        src="/images/Cat fishing on moon.lottie"
                        autoplay
                        loop
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  <article className="relative h-full overflow-hidden border-2 border-ink bg-card p-5 shadow-[6px_6px_0_0_var(--accent-500)] sm:p-6 z-10">
                    <div
                      className="halftone pointer-events-none absolute inset-0 opacity-[0.04]"
                      aria-hidden
                    />

                    <div className="relative">
                    {/* role + type + NOW */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-comic text-xl leading-none tracking-wide text-ink sm:text-2xl">
                        {job.role}
                      </h3>
                      <span className="border border-ink/25 px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] text-ink-muted uppercase">
                        {job.type}
                      </span>
                      {job.current && (
                        <span className="border-2 border-ink bg-accent-500 px-2 py-0.5 font-comic text-xs tracking-wide text-band-foreground">
                          Now
                        </span>
                      )}
                    </div>

                    {/* company */}
                    <p className="mt-1.5 font-mono text-xs tracking-[0.2em] text-accent-500 uppercase">
                      {job.company}
                    </p>

                    {/* meta: dates · duration · location · remote */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-ink-muted">
                      <span>{job.period}</span>
                      <span className="text-accent-500">·</span>
                      <span>{job.duration}</span>
                      <span className="h-3 w-px bg-ink-muted/30" />
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={11} className="text-accent-500" />
                        {job.location}
                      </span>
                      {job.remote && (
                        <span className="border border-accent-500 px-1.5 py-0.5 text-[9px] tracking-[0.15em] text-accent-500 uppercase">
                          Remote
                        </span>
                      )}
                    </div>

                    {/* bullets */}
                    <ul className="mt-3.5 space-y-1.5">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2.5 text-[13px] leading-relaxed text-ink-muted sm:text-sm"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* skill chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="border border-ink/20 px-2 py-0.5 font-mono text-[10px] text-ink-muted transition-colors hover:border-accent-500 hover:text-accent-500"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
