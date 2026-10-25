import { Redis } from "@upstash/redis";

/* Resume download counts, kept in the Upstash Redis database connected to
   the Vercel project. Redis.fromEnv() reads KV_REST_API_URL / _TOKEN (or
   the UPSTASH_REDIS_REST_* names). Without them, recording is a no-op so
   local dev and the site keep working. */
const configured = Boolean(
  (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN),
);
const redis = configured ? Redis.fromEnv() : null;

export type DownloadPath = "direct" | "email";

export type RecentDownload = {
  path: DownloadPath;
  at: string;
  name?: string;
  email?: string;
};

const TOTALS = "downloads";
const DAILY = "downloads:daily";
const RECENT = "downloads:recent";
const RECENT_LIMIT = 50;

/* Days are bucketed in India time, where the site's owner reads the stats. */
function today() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export async function recordDownload(
  path: DownloadPath,
  who?: { name: string; email: string },
) {
  if (!redis) return;
  const entry: RecentDownload = { path, at: new Date().toISOString(), ...who };
  await redis
    .pipeline()
    .hincrby(TOTALS, "total", 1)
    .hincrby(TOTALS, path, 1)
    .hincrby(DAILY, today(), 1)
    .lpush(RECENT, JSON.stringify(entry))
    .ltrim(RECENT, 0, RECENT_LIMIT - 1)
    .exec();
}

export async function getDownloadStats() {
  if (!redis) return null;
  const [totals, daily, recent] = await Promise.all([
    redis.hgetall<Record<string, number>>(TOTALS),
    redis.hgetall<Record<string, number>>(DAILY),
    redis.lrange<RecentDownload>(RECENT, 0, RECENT_LIMIT - 1),
  ]);
  return {
    total: Number(totals?.total ?? 0),
    direct: Number(totals?.direct ?? 0),
    email: Number(totals?.email ?? 0),
    today: Number(daily?.[today()] ?? 0),
    daily: Object.entries(daily ?? {})
      .map(([day, count]) => ({ day, count: Number(count) }))
      .sort((a, b) => b.day.localeCompare(a.day))
      .slice(0, 14),
    recent,
  };
}
