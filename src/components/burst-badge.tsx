import type { ReactNode } from "react";

export function BurstBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-accent-500 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-band-foreground ${className}`}
      style={{
        clipPath:
          "polygon(8% 0%, 92% 0%, 100% 25%, 100% 75%, 92% 100%, 8% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {children}
    </span>
  );
}
