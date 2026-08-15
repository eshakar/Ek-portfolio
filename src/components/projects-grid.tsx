"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/resume";
import { BurstBadge } from "@/components/burst-badge";
import { ComicCloud, cloudMessages } from "@/components/comic-cloud";
import { RunningLottie } from "@/components/running-lottie";

const funnyBadges = [
  "IT'S ALIVE!",
  "SHIPPED!",
  "BOOM!",
  "ZAP!",
  "POW!",
  "BEHOLD!",
];

/* A random line, never the one that was just showing. */
function nextMessage(previous?: string) {
  const pool = cloudMessages.filter((m) => m !== previous);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function ProjectsGrid() {
  // which card is hovered, and the message its cloud drew for this hover
  const [cloud, setCloud] = useState<{ index: number; message: string } | null>(
    null,
  );

  const lastMessage = useRef<string>(undefined);

  const showCloud = (index: number) => {
    const message = nextMessage(lastMessage.current);
    lastMessage.current = message;
    setCloud({ index, message });
  };

  return (
    <>
      <RunningLottie />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => {
          const badgeText = funnyBadges[i % funnyBadges.length];
          const hoverRotate = i % 2 === 0 ? 2 : -2;
          const side = i % 2 === 0 ? "left" : "right";

          return (
            <div
              key={project.title}
              className="relative"
              onMouseEnter={() => showCloud(i)}
              onMouseLeave={() => setCloud((c) => (c?.index === i ? null : c))}
            >
              <AnimatePresence>
                {cloud?.index === i && (
                  <ComicCloud
                    key={cloud.message}
                    message={cloud.message}
                    side={side}
                  />
                )}
              </AnimatePresence>

              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  y: -8,
                  x: -8,
                  rotate: hoverRotate,
                  scale: 1.02,
                  zIndex: 10,
                }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                className="group relative flex h-full flex-col justify-between border-2 border-rule bg-paper p-5 shadow-[5px_5px_0_0_var(--rule)] transition-all duration-300 hover:border-accent-500 hover:shadow-[12px_12px_0_0_var(--accent-500)] cursor-pointer"
              >
                {/* Funny hidden speed lines that reveal on hover */}
                <div
                  className="speed-lines absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]"
                  aria-hidden
                />

                <BurstBadge className="absolute -top-3 -right-3 rotate-12 transition-transform duration-300 group-hover:rotate-[24deg] group-hover:scale-110 border-2 border-ink bg-accent-500 text-band-foreground px-2 py-0.5 text-xs z-20">
                  {badgeText}
                </BurstBadge>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-comic text-2xl font-bold leading-snug tracking-wide text-ink transition-colors group-hover:text-accent-500">
                      {project.title}
                    </h3>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-transparent transition-all group-hover:border-ink group-hover:bg-accent-500"
                    >
                      <ArrowUpRight
                        size={18}
                        className="text-ink-muted transition-colors group-hover:text-ink"
                      />
                    </motion.div>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted transition-colors group-hover:text-ink font-medium">
                    {project.tagline}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border-2 border-transparent bg-ink/5 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-ink-muted uppercase transition-all duration-300 group-hover:border-ink group-hover:bg-band group-hover:text-band-foreground group-hover:-translate-y-1 group-hover:shadow-[2px_2px_0_0_var(--ink)]"
                    >
                      #{tag.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </motion.a>
            </div>
          );
        })}
      </div>
    </>
  );
}
