"use client";

import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { getProgramme, programmes } from "@/content/programmes";
import { contact } from "@/content/site";
import type { EnquiryResponseBody } from "@/lib/enquiry/handle";
import {
  emptyEnquiry,
  enquiryTypes,
  participantOptions,
  parseEnquiry,
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/enquiry/schema";
import { buttonClass } from "./ui";

type Status = "idle" | "submitting" | "sent" | "failed";

const inputClass =
  "block w-full min-w-0 max-w-full text-ellipsis rounded-[3px] border bg-white px-4 py-3 text-[1rem] leading-normal text-charcoal placeholder:text-slate focus-visible:border-navy aria-[invalid=true]:border-error border-field";

const fieldLabels: Record<EnquiryField, string> = {
  type: "Enquiry type",
  name: "Full name",
  email: "Email address",
  phone: "Telephone",
  organisation: "Organisation",
  programme: "Programme",
  service: "Service area",
  participants: "Estimated number of participants",
  timeframe: "Preferred timeframe",
  message: "Message",
};

/** Only the fields shown for the chosen enquiry type are submitted. */
function visibleValues(values: EnquiryValues): EnquiryValues {
  const corporate = values.type === "corporate";
  return {
    ...values,
    programme: values.type === "general" ? "" : values.programme,
    service: corporate ? values.service : "",
    participants: corporate ? values.participants : "",
    timeframe: corporate ? values.timeframe : "",
  };
}

function Field({
  id,
  label,
  optional = false,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="block font-display text-sm font-bold text-navy">
        {label}
        {optional ? (
          <span className="font-sans font-normal text-slate"> (optional)</span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-error">
          <span className="sr-only">Error: </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({ initial }: { initial?: Partial<EnquiryValues> }) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryValues>({ ...emptyEnquiry, ...initial });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "failed") resultRef.current?.focus();
  }, [status]);

  const id = (field: EnquiryField) => `${formId}-${field}`;
  const corporate = values.type === "corporate";
  const errorEntries = Object.entries(errors) as [EnquiryField, string][];

  function set<Field extends EnquiryField>(field: Field, value: EnquiryValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function describedBy(field: EnquiryField, hasHint = false) {
    const ids = [
      hasHint ? `${id(field)}-hint` : null,
      errors[field] ? `${id(field)}-error` : null,
    ].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  }

  function showErrors(next: EnquiryErrors) {
    setErrors(next);
    setStatus("idle");
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const payload = parseEnquiry(visibleValues(values));
    const clientErrors = validateEnquiry(payload);
    if (Object.keys(clientErrors).length > 0) {
      showErrors(clientErrors);
      return;
    }

    setErrors({});
    setFailure("");
    setStatus("submitting");

    let body: EnquiryResponseBody | null = null;
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          companyWebsite: honeypot,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      body = (await response.json()) as EnquiryResponseBody;
    } catch {
      body = null;
    }

    // Confirmation is shown only when the server reports the enquiry was accepted.
    if (body?.ok === true) {
      setStatus("sent");
      return;
    }

    if (body && body.code === "invalid" && body.errors) {
      showErrors(body.errors);
      return;
    }

    setFailure(
      body?.message ??
        "Your message was not sent because we could not reach the server. Check your connection and try again.",
    );
    setStatus("failed");
  }

  if (status === "sent") {
    const programme = getProgramme(values.programme);
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-[3px] border border-line bg-ivory p-8 outline-none sm:p-10"
      >
        <span aria-hidden="true" className="block h-0.5 w-12 bg-gold" />
        <h2 className="mt-6 text-h3 font-bold">Thank you. Your enquiry has been sent.</h2>
        <p className="mt-3 text-slate">
          {values.type === "corporate"
            ? "We have received your corporate training request"
            : "We have received your enquiry"}
          {programme && values.type !== "general" ? ` about ${programme.title}` : ""}
          . We will reply to {values.email}.
        </p>
        <button
          type="button"
          className={buttonClass("outline", "mt-7")}
          onClick={() => {
            setValues({ ...emptyEnquiry, type: values.type });
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Enquiry form">
      {errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[3px] border-l-4 border-error bg-[#fbeeee] px-5 py-4 outline-none"
        >
          <h2 className="font-display text-base font-bold text-error">
            Your message was not sent. Please check {errorEntries.length === 1 ? "this field" : "these fields"}:
          </h2>
          <ul className="mt-2 list-disc pl-5 text-[0.9375rem]">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${id(field)}`} className="text-error underline underline-offset-2">
                  {fieldLabels[field]}: {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "failed" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[3px] border-l-4 border-error bg-[#fbeeee] px-5 py-4 outline-none"
        >
          <h2 className="font-display text-base font-bold text-error">
            Your message was not sent
          </h2>
          <p className="mt-1.5 text-[0.9375rem] text-charcoal">{failure}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
            <a href={contact.email.href} className="text-link">
              {contact.email.display}
            </a>
            {contact.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="text-link whitespace-nowrap">
                {phone.display}
              </a>
            ))}
          </p>
        </div>
      ) : null}

      <fieldset>
        <legend className="font-display text-sm font-bold text-navy">
          What would you like to do?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {enquiryTypes.map((option) => {
            const checked = values.type === option.id;
            return (
              <label
                key={option.id}
                className={`flex cursor-pointer gap-3 rounded-[3px] border p-4 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
                  checked
                    ? "border-navy bg-ivory shadow-[inset_0_0_0_1px_var(--color-navy)]"
                    : "border-field bg-white hover:border-navy"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={option.id}
                  checked={checked}
                  onChange={() => set("type", option.id)}
                  className="mt-1 size-4 flex-none accent-navy outline-none"
                />
                <span>
                  <span className="block font-display text-[0.9375rem] font-bold leading-snug text-navy">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-slate">
                    {option.hint}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => set("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
        </Field>

        <Field id={id("email")} label="Email address" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={(event) => set("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
        </Field>

        <Field id={id("phone")} label="Telephone" optional error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => set("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={inputClass}
          />
        </Field>

        <Field
          id={id("organisation")}
          label="Organisation"
          optional={!corporate}
          error={errors.organisation}
        >
          <input
            id={id("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            required={corporate}
            value={values.organisation}
            onChange={(event) => set("organisation", event.target.value)}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={describedBy("organisation")}
            className={inputClass}
          />
        </Field>

        {values.type !== "general" ? (
          <Field
            id={id("programme")}
            label={corporate ? "Programme of interest" : "Programme"}
            optional={corporate}
            error={errors.programme}
            className={corporate ? "" : "sm:col-span-2"}
          >
            <select
              id={id("programme")}
              name="programme"
              required={!corporate}
              value={values.programme}
              onChange={(event) => set("programme", event.target.value)}
              aria-invalid={Boolean(errors.programme)}
              aria-describedby={describedBy("programme")}
              className={`${inputClass} h-[3.125rem]`}
            >
              <option value="">
                {corporate ? "Not sure yet / customised programme" : "Select a programme"}
              </option>
              {programmes.map((programme) => (
                <option key={programme.slug} value={programme.slug}>
                  {programme.title}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        {corporate ? (
          <>
            <Field id={id("service")} label="Service area" optional error={errors.service}>
              <select
                id={id("service")}
                name="service"
                value={values.service}
                onChange={(event) => set("service", event.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={describedBy("service")}
                className={`${inputClass} h-[3.125rem]`}
              >
                <option value="">Select a service area</option>
                {serviceOptions.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={id("participants")}
              label="Estimated number of participants"
              optional
              error={errors.participants}
            >
              <select
                id={id("participants")}
                name="participants"
                value={values.participants}
                onChange={(event) => set("participants", event.target.value)}
                aria-invalid={Boolean(errors.participants)}
                aria-describedby={describedBy("participants")}
                className={`${inputClass} h-[3.125rem]`}
              >
                <option value="">Select an estimate</option>
                {participantOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={id("timeframe")}
              label="Preferred timeframe"
              optional
              error={errors.timeframe}
            >
              <input
                id={id("timeframe")}
                name="timeframe"
                type="text"
                placeholder="For example, within the next quarter"
                value={values.timeframe}
                onChange={(event) => set("timeframe", event.target.value)}
                aria-invalid={Boolean(errors.timeframe)}
                aria-describedby={describedBy("timeframe")}
                className={inputClass}
              />
            </Field>
          </>
        ) : null}

        <Field
          id={id("message")}
          label={corporate ? "Your training needs" : "Your message"}
          hint={
            corporate
              ? "Tell us about your organisation’s objectives and who the training is for."
              : undefined
          }
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={id("message")}
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={(event) => set("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", corporate)}
            className={`${inputClass} min-h-36 resize-y`}
          />
        </Field>
      </div>

      {/* Spam trap: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company website
          <input
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <p className="mt-7 max-w-2xl text-sm leading-relaxed text-slate">
        <strong className="font-semibold text-charcoal">How we use your details.</strong>{" "}
        The information you enter is sent to Coaction Company Limited and used
        to respond to your enquiry. This website does not keep a copy of your
        message and does not add you to a mailing list.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClass("primary", "min-w-48 disabled:cursor-wait disabled:opacity-70")}
        >
          {status === "submitting"
            ? "Sending…"
            : corporate
              ? "Send Corporate Request"
              : "Send Enquiry"}
        </button>
        <p className="text-sm text-slate">All fields are required unless marked optional.</p>
      </div>
    </form>
  );
}

/** Pre-fills the form from ?type=, ?programme= and ?service= on the contact URL. */
export function EnquiryFormFromUrl() {
  const params = useSearchParams();
  const programme = getProgramme(params.get("programme") ?? "")?.slug ?? "";
  const service =
    serviceOptions.find((option) => option.id === params.get("service"))?.id ?? "";
  const typeParam = params.get("type");
  const type =
    typeParam === "corporate" || typeParam === "programme" || typeParam === "general"
      ? typeParam
      : programme
        ? "programme"
        : service
          ? "corporate"
          : "general";

  return (
    <EnquiryForm
      key={`${type}|${programme}|${service}`}
      initial={{ type, programme, service }}
    />
  );
}
