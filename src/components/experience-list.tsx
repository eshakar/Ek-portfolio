"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/resume";

export function ExperienceList() {
  return (
    <div className="space-y-6">
      {experience.map((job, i) => (
        <motion.div
          key={job.company}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="border-l-4 border-accent-500 py-1 pl-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-comic text-2xl tracking-wide text-ink">{job.role}</h3>
            <span className="font-mono text-[11px] tracking-wide text-ink-muted uppercase">
              {job.period}
            </span>
          </div>
          <p className="font-mono text-xs tracking-widest text-accent-500 uppercase">
            {job.company}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {job.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-500" />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
