"use client";

import { useState } from "react";
import { Mail, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/social-icons";
import { contact } from "@/data/resume";
import { ResumeModal } from "@/components/resume-modal";
import { useSeason } from "@/components/season-provider";

const links = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: LinkedinIcon, label: "LinkedIn", value: "Connect on LinkedIn", href: contact.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "See the code", href: contact.github },
  { icon: YoutubeIcon, label: "YouTube", value: "Watch the channel", href: contact.youtube },
];

export function ConnectPanel() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { season } = useSeason();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, message, season }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

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

      {/* Contact Form */}
      <form onSubmit={handleContactSubmit} className="space-y-4 border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_0_var(--accent-500)]">
        <h3 className="font-comic text-xl text-ink font-bold tracking-wide">Drop a Message</h3>
        <div className="space-y-3">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-ink bg-card px-4 py-2 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-ink bg-card px-4 py-2 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
          />
          <textarea
            required
            placeholder="What's on your mind?"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none border-2 border-ink bg-card px-4 py-2 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-accent-500 px-5 py-2.5 font-comic text-sm tracking-wide text-band-foreground uppercase transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Transmission"}
          </button>
          
          <button
            type="button"
            onClick={() => setResumeModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-2.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-accent-500 hover:border-accent-500"
          >
            <Download size={16} />
            Download resume
          </button>
        </div>
        
        {status === "error" && (
          <p className="text-center font-mono text-xs text-red-500 mt-2">
            Failed to send message. Please try email instead.
          </p>
        )}
      </form>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </div>
  );
}
