import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "Experience | Esha Kar",
};

export default function ExperiencePage() {
  return (
    <>
      <ExperienceTimeline />
      <IssueNav
        prev={{ href: "/projects", label: "Projects" }}
        next={{ href: "/connect", label: "Connect" }}
      />
    </>
  );
}
