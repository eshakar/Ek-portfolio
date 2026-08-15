"use client";

import { useMemo } from "react";

export type Variant = "petals" | "green" | "leaves" | "snow" | "rain";

const VARIANT_CLASS: Record<Variant, string> = {
  petals: "particle-petal",
  green: "particle-green",
  leaves: "particle-leaf",
  snow: "particle-snow",
  rain: "particle-rain",
};

const DEFAULT_COUNT: Record<Variant, number> = {
  petals: 14,
  green: 14,
  leaves: 12,
  snow: 22,
  rain: 40,
};

const BASE_SIZE: Record<Variant, { width: number; height: number }> = {
  petals: { width: 9, height: 9 },
  green: { width: 10, height: 8 },
  leaves: { width: 10, height: 8 },
  snow: { width: 6, height: 6 },
  rain: { width: 1, height: 16 },
};

// Deterministic pseudo-random (integer/bitwise math only) so it's pure during
// render AND bit-identical between server (Node's V8) and client (browser V8) —
// Math.sin/cos are not guaranteed to match across engines, which broke hydration.
function seeded(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const round = (n: number) => Math.round(n * 1000) / 1000;

export function Particles({
  variant,
  count,
  seedOffset = 0,
}: {
  variant: Variant;
  count?: number;
  /** Shifts the deterministic seed so two overlaid fields don't line up. */
  seedOffset?: number;
}) {
  const total = count ?? DEFAULT_COUNT[variant];
  const base = BASE_SIZE[variant];

  const items = useMemo(
    () =>
      Array.from({ length: total }, (_, idx) => {
        const i = idx + seedOffset;
        const r1 = seeded(i * 1000 + 1);
        const r2 = seeded(i * 1000 + 2);
        const r3 = seeded(i * 1000 + 3);
        const r4 = seeded(i * 1000 + 4);
        const r5 = seeded(i * 1000 + 5);
        const duration = variant === "rain" ? 0.8 + r3 * 0.6 : 8 + r3 * 8;
        return {
          left: round(r1 * 100),
          // Negative delay starts each particle partway through its fall, so the
          // field is already full the instant it mounts. With positive delays the
          // screen sits empty after a season change while particles trickle in.
          delay: round(-(r2 * duration)),
          duration: round(duration),
          drift: round((r4 - 0.5) * 80),
          spin: round(120 + r5 * 240),
          scale: round(0.7 + r2 * 0.7),
        };
      }),
    [total, variant, seedOffset],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className={`particle ${VARIANT_CLASS[variant]}`}
          style={
            {
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${round(base.width * p.scale)}px`,
              height: `${round(base.height * p.scale)}px`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
