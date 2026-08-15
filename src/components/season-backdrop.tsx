"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { seasons, type SeasonId } from "@/data/seasons";

/* Text-side scrim: only darkens the left portion on desktop, where the
   headline sits. Kept off on small screens since text stacks above there. */
const SCRIM =
  "linear-gradient(to right, rgba(3,2,2,0.96), rgba(3,2,2,0.9) 16%, rgba(3,2,2,0.74) 30%, rgba(4,3,3,0.5) 45%, rgba(5,4,3,0.24) 60%, rgba(6,4,3,0.07) 74%, transparent 86%)";

/* The hero keeps its own dark stage regardless of the site's light/dark theme:
   the artwork is low-key and cinematic, and it washed out badly against the
   light-theme cream background. */
export const STAGE = "#0a0807";

/* Feathers all four edges so the panel dissolves into the stage colour
   instead of ending on a hard rectangular cut. Wide fade zones keep the
   transition gradual rather than a crisp line at each edge. */
const FEATHER = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 16%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 14%, #000 88%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 16%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 14%, #000 88%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
} as const;

export function SeasonBackdrop({ season }: { season: SeasonId }) {
  const config = seasons.find((s) => s.id === season) ?? seasons[0];
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [firstPaint] = useState(() => season);
  const isRainy = season === "rainy";

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mvX = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.7 });
  const mvY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.7 });

  // Kept small: large offsets would push the framed image off its stage.
  const imgX = useTransform(mvX, (v) => v * 6);
  const imgY = useTransform(mvY, (v) => v * 4);
  const glowX = useTransform(mvX, (v) => 50 + v * 26);
  const glowY = useTransform(mvY, (v) => 50 + v * 18);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="relative h-full w-full"
      aria-hidden
    >
      {/* Fills whatever box the hero gives it; object-contain guarantees the
          whole illustration stays visible and never forces the page to scroll. */}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={reduceMotion ? undefined : { x: imgX, y: imgY, ...FEATHER }}
      >
        <AnimatePresence>
          <motion.div
            key={config.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={config.image}
              alt=""
              fill
              fetchPriority={config.id === firstPaint ? "high" : "auto"}
              loading={config.id === firstPaint ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 90vw"
              className="object-cover object-center lg:object-right"
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 mix-blend-multiply"
          animate={{ background: config.tint }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 hidden lg:block"
          style={{ backgroundImage: SCRIM }}
        />

        {!reduceMotion && (
          <motion.div
            className="absolute h-[40vw] w-[40vw] max-h-[480px] max-w-[480px] rounded-full mix-blend-soft-light"
            style={{
              left: glowX,
              top: glowY,
              translateX: "-50%",
              translateY: "-50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
            }}
          />
        )}

        {isRainy && !reduceMotion && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "rgba(180,210,255,1)",
              animation: "lightning-flash 8s ease-in-out infinite",
              mixBlendMode: "screen",
            }}
          />
        )}

        {isRainy && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 90% at 50% 50%, transparent 30%, rgba(5,10,20,0.55) 100%)",
            }}
          />
        )}

        {/* soft impact flash on scene change (no directional streaks) */}
        {!reduceMotion && (
          <div key={`fx-${config.id}`} className="pointer-events-none absolute inset-0">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
