/** The Postaja mark: a bus-stop sign that is also a P, with three posts departing. */
export function Mark({ size = 30, dark = true }: { size?: number; dark?: boolean }) {
  const pole = dark ? "#F4EFE6" : "#12172B";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="5" width="4.5" height="23" rx="2.25" fill={pole} />
      <circle cx="16.5" cy="12" r="7.5" fill="#FF5A1F" />
      <circle cx="16.5" cy="12" r="3" fill={dark ? "#12172B" : "#F4EFE6"} />
      <circle cx="20" cy="25" r="2" fill={pole} />
      <circle cx="25" cy="25" r="2" fill={pole} opacity="0.55" />
      <circle cx="30" cy="25" r="2" fill={pole} opacity="0.25" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-[-0.04em] ${className}`}>
      postaja<span className="text-signal">.</span>
    </span>
  );
}
