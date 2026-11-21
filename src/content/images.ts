/**
 * Photograph registry. Every photograph on the site is declared here with its
 * alt text and credit, and is listed on the Photo credits page.
 *
 * Only add photographs that were taken in Ghana and that the company owns or
 * holds a verified licence for. Record each one in docs/asset-register.md.
 * A slot with no photograph renders a typographic panel instead.
 */

import type { StaticImageData } from "next/image";

export type PhotoSlot =
  | "hero"
  | "training"
  | "advisory"
  | "downstream"
  | "energy"
  | "mining"
  | "accra";

export type Photo = {
  src: StaticImageData;
  /** Factual description of what the photograph shows. */
  alt: string;
  /** Short, factually neutral caption shown under the photograph. */
  caption: string;
  /** CSS object-position for crops, e.g. "50% 30%". */
  focus?: string;
  credit: {
    title: string;
    creator: string;
    licence: string;
    licenceUrl?: string;
    sourceUrl: string;
    /** Note any change made to the original, e.g. "Cropped". */
    changes?: string;
  };
};

export const photos: Partial<Record<PhotoSlot, Photo>> = {};

export const hasPhotoCredits = Object.keys(photos).length > 0;
