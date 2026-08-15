"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Particles, type Variant } from "@/components/particles";
import { seasons, type SeasonId } from "@/data/seasons";

/** Steady ambient fall, always on screen. */
const STEADY: Record<Variant, number> = {
  petals: 40,
  green: 26,
  leaves: 28,
  snow: 52,
  rain: 130,
};

/** Dense wave that floods the whole background during a season change. */
const SURGE: Record<Variant, number> = {
  petals: 110,
  green: 80,
  leaves: 90,
  snow: 140,
  rain: 220,
};

export function SeasonParticles({ season }: { season: SeasonId }) {
  const config = seasons.find((s) => s.id === season) ?? seasons[0];
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {/* Steady field. mode="wait" lets the outgoing season fall away and clear
          the frame before the incoming one drifts in from above. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={config.particle}
          initial={{ opacity: 0, y: "-7%" }}
          animate={{
            opacity: 1,
            y: "0%",
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            y: "65%",
            transition: { duration: 0.85, ease: [0.55, 0, 0.85, 0.3] },
          }}
          className="absolute inset-0"
        >
          <Particles variant={config.particle} count={STEADY[config.particle]} />
        </motion.div>
      </AnimatePresence>

      {/* Surge: remounts on every season change, so its one-shot keyframe
          floods the background with the new season's petals/leaves/rain/snow
          and then settles back to the steady field. */}
      <AnimatePresence>
        <motion.div
          key={`surge-${config.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0.55, 0] }}
          transition={{ duration: 2.1, times: [0, 0.25, 0.6, 1], ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Particles
            variant={config.particle}
            count={SURGE[config.particle]}
            seedOffset={500}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
