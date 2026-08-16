/* Comic-panel email templates.
 *
 * Email clients strip <script> and most modern CSS, so everything here is
 * table-based with inline styles. Two consequences worth knowing:
 *
 *  - Lottie can never play in an inbox (no JS). The mascots are pre-rendered
 *    to animated GIFs by src/emails/assets/make.py and attached inline by CID.
 *    Outlook for Windows shows only the first frame; everywhere else animates.
 *  - box-shadow is unsupported in Outlook, so the comic hard-shadow is faked
 *    with an offset coloured table cell behind each panel.
 */

import { seasons, type SeasonId } from "@/data/seasons";
import { contact } from "@/data/resume";

const PAPER = "#f7f1e6";
const CARD = "#fffbf2";
const INK = "#16110f";
const MUTED = "#6f6255";
const SITE = "https://ek-portfolio-one.vercel.app";

export type MascotId = "boba" | "love";

export const MASCOTS: Record<MascotId, { file: string; cid: string }> = {
  boba: { file: "boba-neko.gif", cid: "boba-neko@esha" },
  love: { file: "cat-love.gif", cid: "cat-love@esha" },
};

function accentFor(season?: string) {
  const found = seasons.find((s) => s.id === (season as SeasonId));
  return found?.accent ?? "#ff8fb3";
}

/** Escapes user-supplied text before it goes anywhere near the markup. */
function esc(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Comic hard-shadow: an accent block peeking out behind the panel. */
function panel(inner: string, accent: string, bg = CARD) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="border-collapse:separate;">
    <tr>
      <td style="padding:0 6px 6px 0;background-color:${accent};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
               style="border-collapse:collapse;background-color:${bg};border:2px solid ${INK};">
          <tr><td style="padding:22px 24px;">${inner}</td></tr>
        </table>
      </td>
    </tr>
  </table>`;
}

/** A tilted-looking caption tag, like the chapter markers on the site. */
function captionTag(no: string, label: string, accent: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
         style="border-collapse:collapse;">
    <tr>
      <td style="background-color:${accent};border:2px solid ${INK};padding:4px 12px;
                 font-family:'Courier New',Courier,monospace;font-size:12px;font-weight:bold;
                 letter-spacing:2px;text-transform:uppercase;color:${INK};white-space:nowrap;">
        ${esc(no)} &nbsp;|&nbsp; ${esc(label)}
      </td>
    </tr>
  </table>`;
}

/** Bulletproof CTA button — a real link, the only "interaction" email allows. */
function button(label: string, href: string, accent: string, filled = true) {
  const bg = filled ? accent : CARD;
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
         style="border-collapse:separate;display:inline-block;margin:0 6px 8px 0;">
    <tr>
      <td style="padding:0 3px 3px 0;background-color:${INK};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
               style="border-collapse:collapse;">
          <tr>
            <td style="background-color:${bg};border:2px solid ${INK};">
              <a href="${href}" target="_blank"
                 style="display:block;padding:11px 20px;font-family:'Courier New',Courier,monospace;
                        font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;
                        color:${INK};text-decoration:none;">${esc(label)}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

/** A comic speech bubble with a CSS-border tail underneath. */
function speechBubble(html: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="border-collapse:collapse;">
    <tr>
      <td style="background-color:${PAPER};border:2px solid ${INK};padding:16px 18px;
                 font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.65;
                 color:${INK};">${html}</td>
    </tr>
    <tr>
      <td style="padding-left:34px;line-height:0;font-size:0;">
        <div style="width:0;height:0;border-left:11px solid transparent;
                    border-right:11px solid transparent;border-top:14px solid ${INK};"></div>
      </td>
    </tr>
  </table>`;
}

type ShellOptions = {
  preheader: string;
  chapter: string;
  chapterLabel: string;
  title: string;
  mascot: MascotId;
  mascotCaption: string;
  body: string;
  ctas: string;
  accent: string;
};

function shell(o: ShellOptions) {
  const { accent } = o;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(o.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${INK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${esc(o.preheader)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="border-collapse:collapse;background-color:${INK};">
    <tr>
      <td align="center" style="padding:28px 14px 36px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"
               style="border-collapse:collapse;width:600px;max-width:100%;">

          <!-- masthead -->
          <tr>
            <td style="padding-bottom:14px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-family:'Arial Black',Arial,sans-serif;font-size:20px;
                             letter-spacing:1px;color:${PAPER};font-style:italic;">
                    ESHA KAR
                  </td>
                  <td align="right" style="font-family:'Courier New',Courier,monospace;
                             font-size:10px;letter-spacing:3px;color:${MUTED};text-transform:uppercase;">
                    ${esc(contact.role)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- the comic page -->
          <tr>
            <td style="padding:0 6px 6px 0;background-color:${accent};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                     style="border-collapse:collapse;background-color:${PAPER};
                            border:3px solid ${INK};">
                <tr>
                  <td style="padding:24px;">

                    ${captionTag(o.chapter, o.chapterLabel, accent)}

                    <h1 style="margin:16px 0 20px;font-family:'Arial Black',Arial,sans-serif;
                               font-size:30px;line-height:1.15;letter-spacing:0.5px;
                               text-transform:uppercase;color:${INK};font-style:italic;">
                      ${esc(o.title)}
                    </h1>

                    <!-- panel 1: the mascot, animated -->
                    ${panel(`
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center" style="padding-bottom:6px;">
                            <img src="cid:${MASCOTS[o.mascot].cid}"
                                 width="180" height="180" alt="${esc(o.mascotCaption)}"
                                 style="display:block;width:180px;height:180px;border:0;outline:none;
                                        text-decoration:none;background-color:${PAPER};">
                          </td>
                        </tr>
                        <tr>
                          <td align="center" style="font-family:'Courier New',Courier,monospace;
                                     font-size:10px;letter-spacing:2px;text-transform:uppercase;
                                     color:${MUTED};">
                            ${esc(o.mascotCaption)}
                          </td>
                        </tr>
                      </table>`, accent, PAPER)}

                    <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>

                    <!-- panel 2: the words -->
                    ${o.body}

                    <div style="height:20px;line-height:20px;font-size:0;">&nbsp;</div>

                    <div style="text-align:center;">${o.ctas}</div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td align="center" style="padding-top:20px;font-family:'Courier New',Courier,monospace;
                       font-size:10px;letter-spacing:3px;color:${MUTED};text-transform:uppercase;">
              To be continued&hellip;
              <div style="margin-top:8px;letter-spacing:1px;text-transform:none;">
                <a href="${SITE}" style="color:${accent};text-decoration:none;">the portfolio</a>
                &nbsp;&middot;&nbsp;
                <a href="${contact.github}" style="color:${accent};text-decoration:none;">github</a>
                &nbsp;&middot;&nbsp;
                <a href="${contact.linkedin}" style="color:${accent};text-decoration:none;">linkedin</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---------------------------------------------------------------- visitors */

export function resumeVisitorEmail(name: string, season?: string) {
  const accent = accentFor(season);
  const first = esc(name.split(" ")[0] || name);

  return shell({
    accent,
    mascot: "boba",
    mascotCaption: "Boba Neko approves this download",
    chapter: "??",
    chapterLabel: "The cool way",
    preheader: `${name}, your resume is on the way — and you picked the fun door.`,
    title: "Mission accomplished",
    body: speechBubble(`
      <p style="margin:0 0 12px;">Hey <strong>${first}</strong>!</p>
      <p style="margin:0 0 12px;">
        You skipped the boring direct download and took the scenic route.
        Excellent taste. The PDF should already be sitting in your downloads
        folder — if it isn't, the button below has you covered.
      </p>
      <p style="margin:0;">
        If you're hiring, I'm ready to ship. If you're just browsing, thanks
        for wandering through my little corner of the internet.
      </p>
      <p style="margin:14px 0 0;font-family:'Courier New',Courier,monospace;font-size:12px;
                letter-spacing:1px;color:${MUTED};">— Esha</p>`),
    ctas:
      button("Grab the resume", `${SITE}${contact.resume}`, accent) +
      button("See the projects", `${SITE}/projects`, accent, false),
  });
}

export function contactVisitorEmail(name: string, message: string, season?: string) {
  const accent = accentFor(season);
  const first = esc(name.split(" ")[0] || name);

  return shell({
    accent,
    mascot: "love",
    mascotCaption: "Message received, loud and clear",
    chapter: "??",
    chapterLabel: "Incoming transmission",
    preheader: `${name}, your message landed. No servers were harmed.`,
    title: "Signal received",
    body: speechBubble(`
      <p style="margin:0 0 12px;">Hey <strong>${first}</strong>!</p>
      <p style="margin:0 0 12px;">
        Your message just landed. My cat purred, the servers stayed up, and
        I'm reading it right now. Here's what you sent, for the record:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
             style="border-collapse:collapse;margin:0 0 12px;">
        <tr>
          <td style="border-left:4px solid ${accent};padding:8px 0 8px 14px;
                     font-style:italic;color:${MUTED};font-size:14px;">
            ${esc(message).replace(/\n/g, "<br>")}
          </td>
        </tr>
      </table>
      <p style="margin:0;">
        I usually reply fast — unless I'm deep in a debugging rabbit hole.
        Talk soon!
      </p>
      <p style="margin:14px 0 0;font-family:'Courier New',Courier,monospace;font-size:12px;
                letter-spacing:1px;color:${MUTED};">— Esha</p>`),
    ctas:
      button("Read the origin story", `${SITE}/about`, accent) +
      button("See the projects", `${SITE}/projects`, accent, false),
  });
}

/* ------------------------------------------------------------------- owner */

function ownerRow(label: string, value: string, accent: string) {
  return `
  <tr>
    <td style="padding:8px 12px;border:1px solid ${INK};background-color:${accent};
               font-family:'Courier New',Courier,monospace;font-size:11px;font-weight:bold;
               letter-spacing:1px;text-transform:uppercase;color:${INK};width:90px;">
      ${esc(label)}
    </td>
    <td style="padding:8px 12px;border:1px solid ${INK};font-family:Georgia,serif;
               font-size:14px;color:${INK};">${value}</td>
  </tr>`;
}

export function ownerEmail(
  kind: "resume" | "contact",
  name: string,
  email: string,
  message: string | undefined,
  season?: string,
) {
  const accent = accentFor(season);
  const isResume = kind === "resume";

  const rows =
    ownerRow("Name", esc(name), accent) +
    ownerRow("Email", `<a href="mailto:${esc(email)}" style="color:${INK};">${esc(email)}</a>`, accent) +
    ownerRow("Season", esc(season ?? "spring"), accent) +
    (message ? ownerRow("Message", esc(message).replace(/\n/g, "<br>"), accent) : "");

  return shell({
    accent,
    mascot: isResume ? "boba" : "love",
    mascotCaption: isResume ? "Someone wanted the resume" : "Someone said hello",
    chapter: "!!",
    chapterLabel: isResume ? "Resume alert" : "New message",
    preheader: `${name} <${email}>`,
    title: isResume ? "Resume downloaded" : "New message",
    body: panel(`
      <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:15px;color:${INK};">
        ${isResume
          ? "Someone thought the portfolio was worth handing over their email for."
          : "Someone used the Connect panel to get in touch."}
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
             style="border-collapse:collapse;">${rows}</table>`, accent, PAPER),
    ctas: button("Reply", `mailto:${esc(email)}`, accent),
  });
}
