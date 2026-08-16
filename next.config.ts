import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The mail route reads the animated GIFs off disk to attach them inline, and
  // file tracing can't see through fs.readFile — name them explicitly or they
  // won't be bundled into the serverless function.
  outputFileTracingIncludes: {
    "/api/contact": ["src/emails/assets/*.gif"],
  },
};

export default nextConfig;
