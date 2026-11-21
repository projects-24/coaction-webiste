/**
 * Provisional typographic wordmark. Replace the contents of this component
 * with the approved logo (for example an <Image>) when one is supplied; the
 * header and footer both render it from here.
 */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-navy" : "text-white";
  const sub = tone === "dark" ? "text-slate" : "text-white/75";
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-display text-[1.375rem] font-extrabold tracking-[0.16em] ${main}`}
      >
        COACTION
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span aria-hidden="true" className="h-px w-4 bg-gold" />
        <span
          className={`font-display text-[0.5625rem] font-bold tracking-[0.3em] ${sub}`}
        >
          COMPANY LIMITED
        </span>
      </span>
      <span className="sr-only">, home page</span>
    </span>
  );
}
