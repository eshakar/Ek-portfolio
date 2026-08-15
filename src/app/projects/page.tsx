import type { Metadata } from "next";
import { Chapter } from "@/components/chapter";
import { ProjectsGrid } from "@/components/projects-grid";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "Projects | Esha Kar",
};

export default function ProjectsPage() {
  return (
    <>
      <Chapter
        number="02"
        label="Projects"
        kicker="Shipped, not just started"
        title="Field Missions"
        pageNumber="002"
        wide
      >
        <ProjectsGrid />
      </Chapter>
      <IssueNav
        prev={{ href: "/skills", label: "Skills" }}
        next={{ href: "/experience", label: "Experience" }}
      />
    </>
  );
}
