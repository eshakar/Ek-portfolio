import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bangers,
  Caveat,
  Fraunces,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Serif_Bengali,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SeasonProvider } from "@/components/season-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

/* Handwriting face for the "pencil note" story that writes itself in. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Editorial serif for the hero identity name, so "ESHA KAR" reads as an
   identity mark. English uses Fraunces; the Indic scripts use matching Noto
   Serif faces; Japanese falls back to the system Mincho stack (see
   name-intro.tsx). Only the homepage hero uses these — /about is unchanged. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const serifBengali = Noto_Serif_Bengali({
  variable: "--font-serif-bn",
  subsets: ["bengali"],
  weight: ["500", "600"],
  display: "swap",
});

const serifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-serif-hi",
  subsets: ["devanagari"],
  weight: ["500", "600"],
  display: "swap",
});

/* Scripts for the multilingual name intro. Indic subsets are small and
   preload cleanly. Japanese is left to the system CJK stack (see
   name-intro.tsx) — the Noto CJK face is too large to bundle here. */
const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["600", "700"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esha Kar | Senior Full Stack AI-Native Developer",
  description: "Senior Full Stack AI-Native Developer — Next.js, Angular, Nest.js, AI integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* `dark` is hard-coded: this site is dark-only, no theme switching. */
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${bangers.variable} ${caveat.variable} ${fraunces.variable} ${serifBengali.variable} ${serifDevanagari.variable} ${notoBengali.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-paper text-ink">
        <SeasonProvider>
          <Nav />
          <div className="relative flex flex-1 flex-col">{children}</div>
        </SeasonProvider>
      </body>
    </html>
  );
}
