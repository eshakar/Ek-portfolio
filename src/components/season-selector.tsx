"use client";

import { motion } from "framer-motion";
import { seasons, type SeasonId } from "@/data/seasons";

export function SeasonSelector({
  season,
  onChange,
}: {
  season: SeasonId;
  onChange: (id: SeasonId) => void;
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {seasons.map((s, i) => {
        const active = s.id === season;
        return (
          <div key={s.id} className="flex items-center">
            {i > 0 && <span className="mx-1.5 text-white/25 sm:mx-2.5">•</span>}
            <button
              type="button"
              onClick={() => onChange(s.id)}
              className="relative px-0.5 py-1 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors sm:text-xs"
            >
              <span
                style={{ color: active ? s.accent : undefined }}
                className={active ? "" : "text-white/50 hover:text-white/85"}
              >
                {s.label}
              </span>
              {active && (
                <motion.span
                  layoutId="season-active"
                  style={{ background: s.accent }}
                  className="absolute inset-x-0 -bottom-1 h-px"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
