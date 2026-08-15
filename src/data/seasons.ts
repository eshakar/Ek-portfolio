import type { Variant } from "@/components/particles";

export type SeasonId = "spring" | "summer" | "rainy" | "winter";

export type SeasonConfig = {
  id: SeasonId;
  label: string;
  image: string;
  particle: Variant;
  accent: string;
  tint: string;
};

export const seasons: SeasonConfig[] = [
  {
    id: "spring",
    label: "Spring",
    image: "/images/spring.png",
    particle: "petals",
    accent: "#ff8fb3",
    tint: "rgba(255,143,179,0.14)",
  },
  {
    id: "summer",
    label: "Summer",
    image: "/images/summer.png",
    particle: "green",
    accent: "#8fd15c",
    tint: "rgba(143,209,92,0.1)",
  },
  {
    id: "rainy",
    label: "Rainy",
    image: "/images/rainy.png",
    particle: "rain",
    accent: "#6ab0d4",
    tint: "rgba(30,55,90,0.45)",
  },
  {
    id: "winter",
    label: "Winter",
    image: "/images/winter.png",
    particle: "snow",
    accent: "#8fd0e8",
    tint: "rgba(143,208,232,0.16)",
  },
];

export const seasonOrder: SeasonId[] = ["spring", "summer", "rainy", "winter"];
