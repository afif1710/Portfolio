import { useAccessibility } from "../context/AccessibilityContext";

export default function FloatingBadge() {
  const { reducedMotion } = useAccessibility();

  return (
    <a
      href="https://github.com/afif1710"
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "fixed bottom-5 right-5 z-[9999]",
        "rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur",
        "transition hover:bg-violet-500 hover:border-sky-400/40",
        "focus:outline-none focus:ring-2 focus:ring-sky-400",
        reducedMotion ? "" : "motion-safe:animate-pulse",
      ].join(" ")}
    >
      GitHub ↗
    </a>
  );
}
