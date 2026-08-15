import type { Metadata } from "next";
import { OriginStory } from "@/components/origin-story";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "About | Esha Kar",
};

export default function AboutPage() {
  return (
    <>
      <OriginStory />
      <IssueNav
        prev={{ href: "/", label: "Home" }}
        next={{ href: "/skills", label: "Skills" }}
      />
    </>
  );
}
