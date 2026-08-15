import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type IssueLink = { href: string; label: string };

export function IssueNav({ prev, next }: { prev?: IssueLink; next?: IssueLink }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-6 pb-14 sm:px-12">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase transition-colors hover:text-accent-500"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase transition-colors hover:text-accent-500"
        >
          {next.label}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
