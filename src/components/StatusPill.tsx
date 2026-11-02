import type { CaseStudyStatus } from "@/data/case-studies";

export default function StatusPill({ status }: { status: CaseStudyStatus }) {
  return <span className={`status-pill status-${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}
