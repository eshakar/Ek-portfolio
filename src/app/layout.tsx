import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SeasonProvider } from "@/components/season-provider";

/* Fonts are self-hosted from the @fontsource packages instead of
   next/font/google: Turbopack's Google font loader fails the build when
   Google Fonts returns extensionless URLs (vercel/next.js#99114), and this
   also removes the build's dependency on fonts.gstatic.com. */

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  weight: "100 900",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
});

const bangers = localFont({
  variable: "--font-bangers",
  src: "../../node_modules/@fontsource/bangers/files/bangers-latin-400-normal.woff2",
  weight: "400",
});

/* Handwriting face for the "pencil note" story that writes itself in. */
const caveat = localFont({
  variable: "--font-caveat",
  src: "../../node_modules/@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  display: "swap",
});

/* Editorial serif for the hero identity name, so "ESHA KAR" reads as an
   identity mark. English uses Fraunces; the Indic scripts use matching Noto
   Serif faces; Japanese falls back to the system Mincho stack (see
   name-intro.tsx). Only the homepage hero uses these — /about is unchanged. */
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
});

const serifBengali = localFont({
  variable: "--font-serif-bn",
  src: "../../node_modules/@fontsource-variable/noto-serif-bengali/files/noto-serif-bengali-bengali-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

const serifDevanagari = localFont({
  variable: "--font-serif-hi",
  src: "../../node_modules/@fontsource-variable/noto-serif-devanagari/files/noto-serif-devanagari-devanagari-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

/* Scripts for the multilingual name intro. Indic subsets are small and
   preload cleanly. Japanese is left to the system CJK stack (see
   name-intro.tsx) — the Noto CJK face is too large to bundle here. */
const notoBengali = localFont({
  variable: "--font-noto-bengali",
  src: "../../node_modules/@fontsource-variable/noto-sans-bengali/files/noto-sans-bengali-bengali-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
});

const notoDevanagari = localFont({
  variable: "--font-noto-devanagari",
  src: "../../node_modules/@fontsource-variable/noto-sans-devanagari/files/noto-sans-devanagari-devanagari-wght-normal.woff2",
  weight: "100 900",
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
        <Analytics />
      </body>
    </html>
  );
}
