/* Dev-only preview for the comic email templates — open
   /api/preview-email?kind=resume|contact|owner&season=spring|summer|rainy|winter
   in a browser after editing src/emails/template.ts. Returns 404 in production. */

import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  MASCOTS,
  contactVisitorEmail,
  ownerEmail,
  resumeVisitorEmail,
} from "@/emails/template";

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") ?? "resume";
  const season = url.searchParams.get("season") ?? "spring";

  const sample = {
    name: "Riya Sen",
    email: "riya@example.com",
    message: "Loved the comic layout!\nAre you open to freelance work?",
  };

  let html: string;
  if (kind === "contact") {
    html = contactVisitorEmail(sample.name, sample.message, season);
  } else if (kind === "owner") {
    html = ownerEmail("contact", sample.name, sample.email, sample.message, season);
  } else {
    html = resumeVisitorEmail(sample.name, season);
  }

  // cid: refs only resolve inside a mail client, so inline them for the browser.
  for (const { file, cid } of Object.values(MASCOTS)) {
    const buf = await readFile(path.join(process.cwd(), "src/emails/assets", file));
    html = html.replaceAll(`cid:${cid}`, `data:image/gif;base64,${buf.toString("base64")}`);
  }

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
