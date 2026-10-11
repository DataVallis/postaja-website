import type { ReactNode } from "react";

function Icon({ children, size = 28, className = "" }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Feature icons, in the order of features.items in the messages. */
export const featureIcons: ReactNode[] = [
  // Brand DNA
  <Icon key="dna"><path d="M4 4h10l6 6v10H4z" /><path d="M14 4v6h6" /><path d="M8 14h8M8 18h5" /></Icon>,
  // Team
  <Icon key="team"><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.2 0 4 1.8 4 4" /></Icon>,
  // Own look
  <Icon key="look"><circle cx="8" cy="8" r="4" /><circle cx="16" cy="16" r="4" /><path d="M14 6h6M4 18h2" /></Icon>,
  // Plan import
  <Icon key="plan"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 4v16" /></Icon>,
  // Memory
  <Icon key="memory"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /><path d="M12 8v4l3 2" /></Icon>,
  // Ad sets
  <Icon key="ads"><rect x="2" y="6" width="9" height="12" rx="1.5" /><rect x="13" y="3" width="9" height="9" rx="1.5" /><rect x="13" y="14" width="9" height="6" rx="1.5" /></Icon>,
  // Video
  <Icon key="video"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></Icon>,
  // Cost
  <Icon key="cost"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .8 3 2-1.3 1.7-3 2.2-3 .9-3 2.3 1.3 2 3 2 3-.6 3-2" /></Icon>,
  // Claude
  <Icon key="claude"><path d="M9 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" /><path d="M15 7h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" /><path d="M8 12h8" /></Icon>,
];

export function ShieldCheck({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}
