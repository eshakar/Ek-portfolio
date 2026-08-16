"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Zap } from "lucide-react";
import { contact } from "@/data/resume";
import { useAccentVars, useSeason } from "@/components/season-provider";

type Status = "idle" | "loading" | "success" | "error";

const spring = { type: "spring" as const, stiffness: 200, damping: 20 };

export function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  // Portalled to <body>, so the season's accent scale has to come along.
  const accentVars = useAccentVars();
  const { season } = useSeason();

  /* Esc closes, and the page behind stays put while the dialog is up. */
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  /* Start every visit from a clean slate. */
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
    }, 300);
    return () => clearTimeout(t);
  }, [isOpen]);

  function directDownload() {
    const link = document.createElement("a");
    link.href = contact.resume;
    link.download = "Esha_Kar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  }

  async function handleCoolDownload(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "resume", name, email, season }),
      });
      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setTimeout(directDownload, 1800);
    } catch {
      setStatus("error");
    }
  }

  // The nav lives inside a backdrop-filtered <header>, which becomes the
  // containing block for position:fixed — so the dialog has to be portalled to
  // <body> or it renders anchored to the header instead of the viewport.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={accentVars}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overscroll-contain bg-ink/60 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, scale: 0.85, y: 24, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16, rotate: 1 }}
            transition={spring}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-2xl border-4 border-ink bg-paper px-6 pt-10 pb-7 shadow-[12px_12px_0_0_var(--accent-500)] sm:px-9 sm:pt-11 sm:pb-8"
          >
            <div
              className="halftone pointer-events-none absolute inset-0 opacity-[0.12]"
              aria-hidden
            />
            <div
              className="speed-lines pointer-events-none absolute inset-0"
              aria-hidden
            />

            {/* manga caption tag, same language as the story panels */}
            <div className="absolute -top-4 left-5 flex items-center gap-2 border-2 border-ink bg-accent-500 px-3 py-1 shadow-[3px_3px_0_0_var(--ink)]">
              <span className="font-comic text-sm tracking-wide text-band-foreground">
                ??
              </span>
              <span className="h-3 w-px bg-black/25" />
              <span className="font-comic text-sm tracking-wide text-band-foreground">
                THE FORK IN THE ROAD
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-ink bg-card text-ink shadow-[3px_3px_0_0_var(--accent-500)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-none"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                  className="relative z-10 flex flex-col items-center gap-3 py-10 text-center"
                >
                  <motion.span
                    className="text-5xl"
                    animate={{ y: [0, -14, 0], rotate: [0, -12, 8, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  <motion.h2
                    initial={{ scale: 1.6, rotate: -8, opacity: 0 }}
                    animate={{ scale: 1, rotate: -3, opacity: 1 }}
                    transition={{ ...spring, delay: 0.1 }}
                    className="border-4 border-ink bg-accent-500 px-5 py-2 font-comic text-2xl font-bold tracking-wide text-band-foreground uppercase shadow-[5px_5px_0_0_var(--ink)] sm:text-3xl"
                  >
                    Transmission sent!
                  </motion.h2>
                  <p className="max-w-sm font-mono text-xs leading-relaxed text-ink-muted">
                    Check your inbox, {name.split(" ")[0]} — the PDF is landing
                    in your downloads right about… now.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="choose" exit={{ opacity: 0 }} className="relative z-10">
                  <div className="mb-7 text-center">
                    <h2
                      id="resume-modal-title"
                      className="font-comic text-2xl font-bold tracking-wide text-ink uppercase sm:text-3xl"
                    >
                      Wait! Choose your path…
                    </h2>
                    <p className="mt-1.5 font-mono text-[11px] tracking-widest text-ink-muted uppercase">
                      Two doors. One resume. No wrong answers.
                    </p>
                  </div>

                  <div className="relative grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
                    {/* the classic manga face-off marker */}
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ ...spring, delay: 0.28 }}
                      className="absolute top-1/2 left-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-accent-500 font-comic text-sm font-bold text-band-foreground shadow-[2px_2px_0_0_var(--ink)] sm:flex"
                    >
                      VS
                    </motion.span>

                    {/* Path A — the boring one */}
                    <motion.div
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...spring, delay: 0.08 }}
                      className="group flex h-full flex-col border-2 border-ink bg-card p-5 text-center shadow-[5px_5px_0_0_var(--rule)] transition-transform hover:-translate-y-1"
                    >
                      <span className="mb-2 font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase">
                        Path A
                      </span>
                      <h3 className="mb-2 font-comic text-xl font-bold text-ink">
                        Boring direct
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-muted">
                        Just give me the PDF. No emails, no ceremony. I like my
                        life standard and predictable.
                      </p>
                      {/* fills the height Path B spends on its form */}
                      <div className="flex flex-1 items-center justify-center py-4">
                        <span className="text-4xl opacity-50 grayscale" aria-hidden>
                          📄
                        </span>
                      </div>
                      <button
                        onClick={directDownload}
                        className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-ink bg-transparent px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-ink uppercase shadow-[3px_3px_0_0_var(--ink)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-none"
                      >
                        <Download size={14} />
                        Direct download
                      </button>
                    </motion.div>

                    {/* Path B — the fun one */}
                    <motion.div
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...spring, delay: 0.16 }}
                      className="relative flex h-full flex-col border-2 border-ink bg-card p-5 text-center shadow-[6px_6px_0_0_var(--accent-500)] transition-transform hover:-translate-y-1"
                    >
                      <span className="absolute -top-3.5 -right-3 z-10 rotate-[10deg] border-2 border-ink bg-accent-500 px-2.5 py-1 font-comic text-[11px] font-bold text-band-foreground uppercase shadow-[2px_2px_0_0_var(--ink)]">
                        Recommended!
                      </span>
                      <span className="mb-2 font-mono text-[10px] tracking-[0.2em] text-accent-500 uppercase">
                        Path B
                      </span>
                      <h3 className="mb-2 font-comic text-xl font-bold text-ink">
                        The cool way
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-ink-muted">
                        Drop your name &amp; email. Get the PDF{" "}
                        <em>plus</em> a manga-themed thank-you note in your
                        inbox.
                      </p>

                      <form
                        onSubmit={handleCoolDownload}
                        className="mt-auto flex w-full flex-col gap-2"
                      >
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-ink bg-accent-500 px-4 py-2.5 font-mono text-xs font-bold tracking-widest text-band-foreground uppercase shadow-[3px_3px_0_0_var(--ink)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-wait disabled:opacity-70"
                        >
                          {status === "loading" ? (
                            "Sending…"
                          ) : (
                            <>
                              <Zap size={14} />
                              Send it!
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  </div>

                  {status === "error" && (
                    <p className="mt-4 text-center font-mono text-xs text-accent-500">
                      Oops — the servers hiccuped. Grab the direct download
                      instead!
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
