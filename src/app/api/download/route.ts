import { NextResponse } from "next/server";
import { recordDownload } from "@/lib/stats";

/* Counts "direct" resume downloads. Downloads through the email form are
   counted in /api/contact, which also knows the visitor's name. */
export async function POST() {
  try {
    await recordDownload("direct");
  } catch (err) {
    console.error("Download stats:", err);
  }
  return NextResponse.json({ ok: true });
}
