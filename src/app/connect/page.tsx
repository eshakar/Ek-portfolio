import type { Metadata } from "next";
import { Chapter } from "@/components/chapter";
import { ConnectPanel } from "@/components/connect-panel";
import { IssueNav } from "@/components/issue-nav";

export const metadata: Metadata = {
  title: "Connect | Esha Kar",
};

export default function ConnectPage() {
  return (
    <>
      <Chapter
        number="04"
        label="Connect"
        kicker="Say hello"
        title="Send the Signal"
        pageNumber="004"
        accent
      >
        <ConnectPanel />
      </Chapter>
      <IssueNav prev={{ href: "/experience", label: "Experience" }} />
    </>
  );
}
