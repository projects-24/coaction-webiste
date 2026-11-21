import Image from "next/image";
import { photos, type PhotoSlot } from "@/content/images";

/**
 * Renders a registered photograph with a reserved aspect ratio, caption and
 * credit. If the slot has no verified photograph, renders a restrained
 * typographic panel in the same space.
 */
export function PhotoFigure({
  slot,
  ratio = "aspect-[4/3]",
  sizes,
  priority = false,
  className = "",
  tone = "light",
  fallbackLabel = "",
  optional = false,
}: {
  slot: PhotoSlot;
  /** Tailwind aspect-ratio classes; may be responsive. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Caption colour: "light" for light backgrounds, "dark" for navy ones. */
  tone?: "light" | "dark";
  fallbackLabel?: string;
  /** Render nothing, rather than a typographic panel, when the slot is empty. */
  optional?: boolean;
}) {
  const photo = photos[slot];

  if (!photo && optional) return null;

  if (!photo) {
    return (
      <div
        aria-hidden="true"
        className={`relative flex ${ratio} flex-col justify-end overflow-hidden rounded-[3px] bg-navy p-7 sm:p-9 ${className}`}
      >
        <span className="absolute left-7 top-7 h-px w-16 bg-gold sm:left-9 sm:top-9" />
        <span className="absolute -right-10 -top-10 size-56 rounded-full border border-white/10" />
        <span className="absolute -right-24 -top-24 size-96 rounded-full border border-white/10" />
        <span className="max-w-[16rem] font-display text-xl font-bold leading-snug text-white sm:text-2xl">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <figure className={className}>
      <div className={`relative ${ratio} overflow-hidden rounded-[3px] bg-line`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />
      </div>
      <figcaption
        className={`mt-3 text-[0.8125rem] leading-snug ${
          tone === "dark" ? "text-white/70" : "text-slate"
        }`}
      >
        {photo.caption} Photo: {photo.credit.creator}, {photo.credit.licence}.
      </figcaption>
    </figure>
  );
}
