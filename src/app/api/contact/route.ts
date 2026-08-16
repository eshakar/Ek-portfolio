import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  MASCOTS,
  contactVisitorEmail,
  ownerEmail,
  resumeVisitorEmail,
  type MascotId,
} from "@/emails/template";

/* The mascot GIFs are attached by CID rather than linked, so they render
   without the recipient having to allow remote images. next.config.ts adds
   them to this route's file trace. */
const ASSETS = path.join(process.cwd(), "src/emails/assets");

async function inlineMascot(id: MascotId) {
  const { file, cid } = MASCOTS[id];
  return {
    filename: file,
    content: await readFile(path.join(ASSETS, file)),
    cid,
    contentType: "image/gif",
  };
}

export async function POST(req: Request) {
  try {
    const { type, name, email, message, season } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Nodemailer: EMAIL_USER or EMAIL_PASS is not set.");
      return NextResponse.json(
        { error: "Email configuration missing on server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const isResume = type === "resume";
    const visitorMascot: MascotId = isResume ? "boba" : "love";

    const visitorHtml = isResume
      ? resumeVisitorEmail(name, season)
      : contactVisitorEmail(name, message ?? "", season);

    const ownerHtml = ownerEmail(
      isResume ? "resume" : "contact",
      name,
      email,
      message,
      season,
    );

    // Both mails use the same mascot, so one read covers both.
    const mascot = await inlineMascot(visitorMascot);

    await Promise.all([
      transporter.sendMail({
        from: `"Esha Kar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: isResume
          ? "Mission accomplished — your resume is in 🧋"
          : "Signal received! Loud and clear 📡",
        html: visitorHtml,
        attachments: [mascot],
      }),
      transporter.sendMail({
        from: `"Portfolio Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: isResume
          ? `🚨 RESUME DOWNLOAD: ${name}`
          : `💬 NEW MESSAGE: ${name}`,
        html: ownerHtml,
        attachments: [mascot],
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
