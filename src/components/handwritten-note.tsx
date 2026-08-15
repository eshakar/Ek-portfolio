"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HandwrittenNoteProps = {
  /* Use "\n" to force line breaks. */
  text: string;
  /* seconds before the first character appears */
  startDelay?: number;
  /* seconds between each character — larger = slower "writing" */
  perChar?: number;
  className?: string;
};

/* Renders text in a handwriting face and reveals it character by character,
   as if it were being written by hand (a soft graphite "pencil" look). Words
   stay unbroken; line breaks are honoured; the write-on flows across lines. */
export function HandwrittenNote({
  text,
  startDelay = 0,
  perChar = 0.035,
  className = "",
}: HandwrittenNoteProps) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  let charIndex = 0;

  if (reduce) {
    return (
      <p style={{ fontFamily: "var(--font-caveat)" }} className={className}>
        {lines.map((line, l) => (
          <Fragment key={l}>
            {line}
            {l < lines.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </p>
    );
  }

  return (
    <div
      style={{ fontFamily: "var(--font-caveat)" }}
      className={className}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, l) => (
        <span key={l} className="block" aria-hidden>
          {line.split(" ").map((word, w, arr) => (
            <Fragment key={w}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, c) => {
                  const delay = startDelay + charIndex * perChar;
                  charIndex += 1;
                  return (
                    <motion.span
                      key={c}
                      className="inline-block"
                      initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay, duration: 0.28, ease: "easeOut" }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
              {w < arr.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </span>
      ))}
    </div>
  );
}
