import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "gold" | "outline" | "outline-light";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-6 py-3 text-center font-display text-[0.9375rem] font-bold leading-tight tracking-[0.01em] transition-colors duration-150";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-navy-600",
  gold: "bg-gold text-navy hover:bg-gold-soft",
  outline:
    "border border-navy/35 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  "outline-light":
    "border border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`.trim();
}

export function ButtonLink({
  variant = "primary",
  className = "",
  arrow = false,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      {arrow ? <ArrowIcon /> : null}
    </Link>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`size-4 flex-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

/** A "Label →" link used at the end of cards and sections. */
export function ArrowLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-2 font-display text-[0.9375rem] font-bold text-navy underline decoration-gold decoration-2 underline-offset-[0.35em] hover:decoration-navy ${className}`}
      {...props}
    >
      {children}
      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Heading = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <Heading className="text-h2 font-bold">{title}</Heading>
      {children ? (
        <div className="mt-5 text-lead text-slate">{children}</div>
      ) : null}
    </div>
  );
}

/** Ivory page header used on every page except Home. */
export function PageHeader({
  eyebrow,
  title,
  children,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-ivory">
      <div className="container-site pb-14 pt-10 sm:pb-20 sm:pt-14">
        {breadcrumbs}
        {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-h1 font-extrabold">{title}</h1>
        {children ? (
          <div className="mt-6 max-w-2xl text-lead text-slate">{children}</div>
        ) : null}
      </div>
    </header>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="underline decoration-line-strong underline-offset-4 hover:text-navy hover:decoration-navy"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A quiet list with small gold square markers. */
export function MarkerList({
  items,
  className = "",
  columns = false,
}: {
  items: readonly string[];
  className?: string;
  columns?: boolean;
}) {
  return (
    <ul
      className={`${columns ? "grid gap-x-10 sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3.5 border-b border-line py-3 leading-snug"
        >
          <span
            aria-hidden="true"
            className="mt-[0.5em] size-1.5 flex-none bg-gold"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
