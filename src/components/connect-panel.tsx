"use client";

import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/social-icons";
import { contact } from "@/data/resume";

const links = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: LinkedinIcon, label: "LinkedIn", value: "Connect on LinkedIn", href: contact.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "See the code", href: contact.github },
  { icon: YoutubeIcon, label: "YouTube", value: "Watch the channel", href: contact.youtube },
];

export function ConnectPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-rule bg-paper px-4 py-3 shadow-[4px_4px_0_0_var(--rule)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-500 hover:shadow-[6px_6px_0_0_var(--accent-500)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule text-ink-muted transition-colors group-hover:border-accent-500 group-hover:text-accent-500">
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                {label}
              </span>
              <span className="block text-sm text-ink">{value}</span>
            </span>
          </a>
        ))}
      </div>

      <a
        href={contact.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-accent-500 hover:border-accent-500"
      >
        <Download size={16} />
        Download resume
      </a>
    </div>
  );
}
