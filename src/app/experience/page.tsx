import type { Metadata } from "next";
import { Chapter } from "@/components/chapter";
import { ExperienceList } from "@/components/experience-list";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "Experience | Esha Kar",
};

export default function ExperiencePage() {
  return (
    <>
      <Chapter
        number="03"
        label="Experience"
        kicker="Where she's worked"
        title="The Record"
        pageNumber="003"
        wide
      >
        <ExperienceList />
      </Chapter>
      <IssueNav
        prev={{ href: "/projects", label: "Projects" }}
        next={{ href: "/connect", label: "Connect" }}
      />
    </>
  );
}
