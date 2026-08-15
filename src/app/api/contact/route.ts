import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Nodemailer: EMAIL_USER or EMAIL_PASS is not set in environment variables.");
      return NextResponse.json({ error: "Email configuration missing on server." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isResume = type === "resume";

    // Manga-themed HTML template wrapper
    const mangaTemplate = (title: string, content: string) => `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; border: 4px solid #141413; padding: 20px; background-color: #F8F5EE; position: relative;">
        <!-- Manga panel header -->
        <div style="background-color: #FF4A1C; color: #F8F5EE; padding: 5px 15px; font-weight: bold; border: 2px solid #141413; display: inline-block; transform: rotate(-2deg); margin-bottom: 20px; text-transform: uppercase;">
          ${title}
        </div>
        
        <div style="background-color: white; border: 2px solid #141413; padding: 20px; box-shadow: 6px 6px 0 0 #FF4A1C; color: #141413; line-height: 1.6;">
          ${content}
        </div>
        
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666; font-weight: bold; letter-spacing: 2px;">
          ESHA KAR • THE ORIGIN STORY
        </div>
      </div>
    `;

    // Email to the VISITOR
    const visitorSubject = isResume 
      ? "Your resume download (and a cool thank you!) 🚀" 
      : "Message received! Loud and clear. 📡";

    const visitorContent = isResume
      ? `<p>Hey <strong>${name}</strong>!</p>
         <p>You bypassed the boring direct download and opted for the cool email. Excellent choice.</p>
         <p>My resume should be downloading, but if you need it later, it's always available at my portfolio.</p>
         <p>If you're hiring, I'm ready to ship some code. Otherwise, thanks for dropping by my little slice of the internet!</p>
         <p style="margin-top: 20px; font-weight: bold;">Keep building,<br>Esha</p>`
      : `<p>Hey <strong>${name}</strong>!</p>
         <p>I just got your message. My cat purred, the servers didn't crash, and I'm currently reading it.</p>
         <div style="border-left: 4px solid #FF4A1C; padding-left: 10px; margin: 15px 0; font-style: italic; color: #555;">
           "${message}"
         </div>
         <p>I usually reply pretty fast (unless I'm deep in a debugging rabbit hole). Talk soon!</p>
         <p style="margin-top: 20px; font-weight: bold;">Keep building,<br>Esha</p>`;

    // Email to the OWNER (Esha)
    const ownerSubject = isResume 
      ? `🚨 NEW RESUME DOWNLOAD: ${name}` 
      : `💬 NEW MESSAGE: from ${name}`;

    const ownerContent = isResume
      ? `<p>Someone thought your portfolio was cool enough to give their email for the resume!</p>
         <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
           <tr><td style="padding: 8px; border: 1px solid #141413; font-weight: bold; width: 80px;">Name</td><td style="padding: 8px; border: 1px solid #141413;">${name}</td></tr>
           <tr><td style="padding: 8px; border: 1px solid #141413; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #141413;">${email}</td></tr>
         </table>`
      : `<p>You have a new message from the Connect panel!</p>
         <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
           <tr><td style="padding: 8px; border: 1px solid #141413; font-weight: bold; width: 80px;">Name</td><td style="padding: 8px; border: 1px solid #141413;">${name}</td></tr>
           <tr><td style="padding: 8px; border: 1px solid #141413; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #141413;">${email}</td></tr>
         </table>
         <div style="margin-top: 15px; padding: 15px; background-color: #f9f9f9; border: 2px dashed #141413;">
           <strong>Message:</strong><br><br>${message}
         </div>`;

    // Send the emails concurrently
    await Promise.all([
      // Send to visitor
      transporter.sendMail({
        from: `"Esha Kar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: visitorSubject,
        html: mangaTemplate(isResume ? "MISSION ACCOMPLISHED" : "INCOMING TRANSMISSION", visitorContent),
      }),
      // Send to owner
      transporter.sendMail({
        from: `"Portfolio Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: ownerSubject,
        html: mangaTemplate(isResume ? "RESUME ALERT" : "NEW MESSAGE", ownerContent),
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
