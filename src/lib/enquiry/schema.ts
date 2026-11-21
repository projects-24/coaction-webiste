/**
 * Enquiry form fields and validation. Imported by both the browser form and
 * the server route, so the two always apply the same rules.
 */

import { getProgramme } from "@/content/programmes";
import type { EnquiryType } from "@/content/site";

export const enquiryTypes: { id: EnquiryType; label: string; hint: string }[] = [
  {
    id: "general",
    label: "General enquiry",
    hint: "A question about Coaction or our services.",
  },
  {
    id: "programme",
    label: "Programme enquiry",
    hint: "Interest in a specific training programme.",
  },
  {
    id: "corporate",
    label: "Corporate training request",
    hint: "In-house or customised training for your organisation.",
  },
];

export const serviceOptions = [
  { id: "training", label: "Training & Capacity Development" },
  { id: "advisory", label: "Corporate Advisory & Organisational Development" },
] as const;

export const participantOptions = [
  "Fewer than 10",
  "10 to 25",
  "26 to 50",
  "More than 50",
  "Not yet known",
] as const;

export type EnquiryValues = {
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  /** Programme slug, or "" when none is selected. */
  programme: string;
  /** Service id, or "" when none is selected. */
  service: string;
  participants: string;
  timeframe: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryValues = {
  type: "general",
  name: "",
  email: "",
  phone: "",
  organisation: "",
  programme: "",
  service: "",
  participants: "",
  timeframe: "",
  message: "",
};

const limits: Record<Exclude<EnquiryField, "type">, number> = {
  name: 120,
  email: 254,
  phone: 30,
  organisation: 160,
  programme: 80,
  service: 40,
  participants: 40,
  timeframe: 120,
  message: 4000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9 ()\-.]{7,}$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "";
}

function singleLine(value: unknown): string {
  return text(value).replace(/\s+/g, " ");
}

/** Coerces untrusted input into the expected shape without trusting its types. */
export function parseEnquiry(input: unknown): EnquiryValues {
  const source = (input && typeof input === "object" ? input : {}) as Record<
    string,
    unknown
  >;
  const type = singleLine(source.type);
  return {
    type: type === "programme" || type === "corporate" ? type : "general",
    name: singleLine(source.name),
    email: singleLine(source.email),
    phone: singleLine(source.phone),
    organisation: singleLine(source.organisation),
    programme: singleLine(source.programme),
    service: singleLine(source.service),
    participants: singleLine(source.participants),
    timeframe: singleLine(source.timeframe),
    message: text(source.message),
  };
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email))
    errors.email = "Enter an email address in the format name@example.com.";

  if (values.phone && !phonePattern.test(values.phone))
    errors.phone =
      "Enter a telephone number using digits, for example +233 20 000 0000, or leave this blank.";

  if (values.type === "corporate" && !values.organisation)
    errors.organisation = "Enter the name of your organisation.";

  if (values.type === "programme" && !values.programme)
    errors.programme = "Select the programme you are interested in.";
  if (values.programme && !getProgramme(values.programme))
    errors.programme = "Select a programme from the list.";

  if (values.service && !serviceOptions.some((s) => s.id === values.service))
    errors.service = "Select a service from the list.";

  if (
    values.participants &&
    !participantOptions.includes(
      values.participants as (typeof participantOptions)[number],
    )
  )
    errors.participants = "Select an option from the list.";

  if (!values.message)
    errors.message =
      values.type === "corporate"
        ? "Tell us briefly about your training needs."
        : "Enter your message.";
  else if (values.message.length < 10)
    errors.message = "Add a little more detail so we can respond usefully.";

  for (const [field, max] of Object.entries(limits) as [
    Exclude<EnquiryField, "type">,
    number,
  ][]) {
    if (!errors[field] && values[field].length > max)
      errors[field] = `Shorten this to ${max} characters or fewer.`;
  }

  return errors;
}

export function enquiryTypeLabel(type: EnquiryType): string {
  return enquiryTypes.find((option) => option.id === type)!.label;
}
