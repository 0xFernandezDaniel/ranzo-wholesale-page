/**
 * A marked blank: a fact, asset or link the page is still waiting on. It is a
 * note for Daniel, so it is the quietest thing on the page: small, grey, no
 * colour. Never replace one with a guess. Fill it from the brief or the
 * Linear issue named in `source`, then delete the marker.
 *
 * Find them all with: grep -rn "<Blank" app components
 */
export default function Blank({
  children,
  source,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  /** Who or what fills it, e.g. "Daniel, RAN-42". */
  source?: string;
  /** "dark" for notes that sit on a navy band. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const colours =
    tone === "dark" ? "border-accent-400 text-accent-200" : "border-stone-300 text-stone-500";
  return (
    <span
      data-blank
      className={`rounded border border-dashed box-decoration-clone px-1.5 py-0.5 text-[0.8125rem] font-normal leading-normal ${colours} ${className}`}
    >
      To come: {children}
      {source ? ` (${source})` : null}
    </span>
  );
}
