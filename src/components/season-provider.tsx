"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { seasons, type SeasonId } from "@/data/seasons";

type SeasonContextValue = {
  season: SeasonId;
  setSeason: (s: SeasonId) => void;
};

const SeasonContext = createContext<SeasonContextValue | null>(null);

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used within a SeasonProvider");
  return ctx;
}

const STORAGE_KEY = "esha-season";

/* Builds the full accent scale from a single season colour, matching the
   dark-theme direction (higher number = lighter, lower = darker). Overriding
   these on a wrapper re-tints every `accent-*` utility on the site. */
function accentVars(base: string): React.CSSProperties {
  return {
    "--accent-500": base,
    "--accent-600": `color-mix(in srgb, ${base} 78%, white)`,
    "--accent-700": `color-mix(in srgb, ${base} 56%, white)`,
    "--accent-800": `color-mix(in srgb, ${base} 36%, white)`,
    "--accent-900": `color-mix(in srgb, ${base} 20%, white)`,
    "--accent-400": `color-mix(in srgb, ${base} 82%, black)`,
    "--accent-300": `color-mix(in srgb, ${base} 62%, black)`,
    "--accent-200": `color-mix(in srgb, ${base} 44%, black)`,
    "--accent-100": `color-mix(in srgb, ${base} 28%, black)`,
  } as React.CSSProperties;
}

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeasonState] = useState<SeasonId>("spring");

  // Restore the last-chosen season after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SeasonId | null;
    if (saved && seasons.some((s) => s.id === saved)) setSeasonState(saved);
  }, []);

  const setSeason = (s: SeasonId) => {
    setSeasonState(s);
    try {
      localStorage.setItem(STORAGE_KEY, s);
    } catch {
      /* storage unavailable — non-fatal */
    }
  };

  const base = seasons.find((s) => s.id === season)?.accent ?? "#ff8fb3";

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      <div
        style={accentVars(base)}
        className="paper-texture relative flex min-h-full flex-1 flex-col"
      >
        {children}
      </div>
    </SeasonContext.Provider>
  );
}
