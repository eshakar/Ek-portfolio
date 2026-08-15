"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { contact } from "@/data/resume";
import { ResumeModal } from "@/components/resume-modal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/connect", label: "Connect" },
];

const CAT = 88;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const homeAnchorRef = useRef<HTMLSpanElement>(null);
  const resumeAnchorRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{
    homeX: number;
    resumeX: number;
    y: number;
  } | null>(null);

  // Measure the two horizontal rest positions (left of Home / after Resume);
  // the cat sits on the nav's bottom line. Kept correct on resize.
  useEffect(() => {
    function measure() {
      const host = headerRef.current?.getBoundingClientRect();
      const home = homeAnchorRef.current?.getBoundingClientRect();
      const resume = resumeAnchorRef.current?.getBoundingClientRect();
      if (!host || !home || !resume) return;
      const centerX = (el: DOMRect) => el.left - host.left + el.width / 2;
      setPos({
        homeX: centerX(home),
        resumeX: centerX(resume),
        // sit up on the nav's bottom border line (kept fully in view)
        y: Math.max(0, host.height - CAT),
      });
    }
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [pathname]);

  // Rests beside Home; glides over to the Resume button while it's hovered.
  const targetX = pos ? (resumeHovered ? pos.resumeX : pos.homeX) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div ref={headerRef} className="relative">
        {/* the love-cat, sliding between Home and the Resume button (desktop) */}
        {pos && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-40 hidden sm:block"
            style={{ width: CAT, height: CAT, marginLeft: -CAT / 2 }}
            initial={false}
            animate={{ x: targetX, y: pos.y }}
            transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}
          >
            {/* inner wrapper flips (inverts) the cat horizontally */}
            <div style={{ width: CAT, height: CAT, transform: "scaleX(-1)" }}>
              <DotLottieReact
                src="/images/cat_love.lottie"
                autoplay
                loop
                style={{ width: CAT, height: CAT }}
              />
            </div>
          </motion.div>
        )}

        {/* Fixed 64px + 1px border = 65px, which the hero's height calc depends on. */}
        <div className="flex h-16 items-center justify-between px-6 sm:px-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="shrink-0 font-comic text-xl tracking-wide whitespace-nowrap text-ink uppercase"
            >
              Esha Kar
            </Link>

            {/* resume download button */}
            <button
              onClick={() => setResumeModalOpen(true)}
              onMouseEnter={() => setResumeHovered(true)}
              onMouseLeave={() => setResumeHovered(false)}
              className="group inline-flex items-center gap-1.5 border-2 border-ink bg-band px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.15em] text-band-foreground uppercase shadow-[3px_3px_0_0_var(--accent-500)] transition-transform hover:-translate-y-0.5"
            >
              <Download
                size={13}
                className="transition-transform group-hover:translate-y-0.5"
              />
              Resume
            </button>

            {/* landing spot for the cat when the resume is hovered */}
            <span
              ref={resumeAnchorRef}
              aria-hidden
              className="hidden h-10 w-16 shrink-0 sm:inline-block"
            />
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            {/* the cat's default resting spot, left of Home */}
            <span
              ref={homeAnchorRef}
              aria-hidden
              className="inline-block h-10 w-16 shrink-0"
            />
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative px-3 py-2">
                  <motion.span
                    whileHover={{ y: -2, rotate: -2 }}
                    className={`inline-block font-mono text-xs tracking-[0.2em] uppercase transition-colors ${
                      active ? "text-accent-500" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </motion.span>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-1 h-[3px] bg-accent-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-rule text-ink sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-rule sm:hidden"
          >
            <div className="flex flex-col px-6 py-3">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`py-2.5 font-mono text-sm tracking-widest uppercase ${
                      active ? "text-accent-500" : "text-ink-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </header>
  );
}
