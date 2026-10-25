import { timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { Chapter } from "@/components/chapter";
import { getDownloadStats, type RecentDownload } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Stats | Esha Kar",
  robots: { index: false, follow: false },
};

/* Private page: unlocked by /stats?key=<STATS_KEY>. It isn't linked from
   the nav. Visitor numbers live in Vercel Web Analytics, linked below. */
function keyMatches(given: string | undefined) {
  const expected = process.env.STATS_KEY;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const ANALYTICS_URL = "https://vercel.com/eshakars-projects/ek-portfolio/analytics";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function StatsPage({ searchParams }: PageProps<"/stats">) {
  const { key } = await searchParams;
  const given = typeof key === "string" ? key : undefined;

  if (!keyMatches(given)) {
    return (
      <Chapter number="??" label="Stats" title="Classified" kicker="Owner only">
        <form method="GET" className="flex flex-col gap-3 sm:flex-row">
          <input
            type="password"
            name="key"
            required
            placeholder="Stats key"
            aria-label="Stats key"
            className="flex-1 border-2 border-ink bg-paper px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-accent-500 focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer border-2 border-ink bg-accent-500 px-5 py-2 font-mono text-xs font-bold tracking-widest text-band-foreground uppercase shadow-[3px_3px_0_0_var(--ink)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            Unlock
          </button>
        </form>
        {given && (
          <p className="mt-3 font-mono text-xs text-accent-500">
            Wrong key. Try again.
          </p>
        )}
      </Chapter>
    );
  }

  const stats = await getDownloadStats();

  return (
    <Chapter number="??" label="Stats" title="Mission Report" kicker="Owner only" wide accent>
      {!stats ? (
        <p className="font-mono text-sm text-ink-muted">
          The stats database isn&apos;t connected yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Tile label="Total downloads" value={stats.total} highlight />
            <Tile label="Today" value={stats.today} />
            <Tile label="Direct" value={stats.direct} />
            <Tile label="Via email form" value={stats.email} />
          </div>

          <section>
            <Heading>Last 14 days</Heading>
            {stats.daily.length === 0 ? (
              <Empty />
            ) : (
              <ul className="divide-y divide-rule border-2 border-ink">
                {stats.daily.map(({ day, count }) => (
                  <li key={day} className="flex justify-between px-3 py-2 font-mono text-sm text-ink">
                    <span>{day}</span>
                    <span className="font-bold">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <Heading>Recent downloads</Heading>
            {stats.recent.length === 0 ? (
              <Empty />
            ) : (
              <ul className="divide-y divide-rule border-2 border-ink">
                {stats.recent.map((d: RecentDownload, i) => (
                  <li
                    key={`${d.at}-${i}`}
                    className="flex flex-col gap-0.5 px-3 py-2 font-mono text-xs text-ink sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>
                      {d.path === "email" ? (
                        <>
                          <span className="font-bold">{d.name}</span>{" "}
                          <span className="text-ink-muted">({d.email})</span>
                        </>
                      ) : (
                        <span className="text-ink-muted">Anonymous · direct</span>
                      )}
                    </span>
                    <span className="text-ink-muted">{formatWhen(d.at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <a
            href={ANALYTICS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start border-2 border-ink px-4 py-2 font-mono text-xs font-bold tracking-widest text-ink uppercase shadow-[3px_3px_0_0_var(--ink)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-none"
          >
            Visitors → Vercel Analytics ↗
          </a>
        </div>
      )}
    </Chapter>
  );
}

function Tile({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div
      className={`border-2 border-ink p-4 text-center shadow-[3px_3px_0_0_var(--ink)] ${
        highlight ? "bg-accent-500 text-band-foreground" : "bg-paper text-ink"
      }`}
    >
      <div className="font-comic text-3xl font-bold">{value}</div>
      <div className="mt-1 font-mono text-[10px] tracking-widest uppercase opacity-80">{label}</div>
    </div>
  );
}

function Heading({ children }: { children: string }) {
  return (
    <h2 className="mb-3 font-comic text-xl font-bold tracking-wide text-ink uppercase">{children}</h2>
  );
}

function Empty() {
  return <p className="font-mono text-xs text-ink-muted">No downloads yet.</p>;
}
