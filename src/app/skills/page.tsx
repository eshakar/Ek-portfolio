import type { Metadata } from "next";
import { SkillsArsenal } from "@/components/skills-arsenal";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "Skills | Esha Kar",
};

export default function SkillsPage() {
  return (
    <>
      <SkillsArsenal />
      <IssueNav
        prev={{ href: "/about", label: "About" }}
        next={{ href: "/projects", label: "Projects" }}
      />
    </>
  );
}
