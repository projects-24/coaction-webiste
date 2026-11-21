"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, corporateRequestHref, primaryNav, routes } from "@/content/site";
import { buttonClass } from "./ui";
import { Wordmark } from "./wordmark";

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    // Close the mobile menu if the window grows to the desktop layout.
    const desktop = window.matchMedia("(min-width: 1180px)");
    function onDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 min-[1180px]:h-20">
        <Link
          href={routes.home}
         
          className="flex-none py-2"
          onClick={close}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden min-[1180px]:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block py-3 font-display text-[0.9375rem] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-gold after:transition-opacity ${
                      active
                        ? "text-navy after:opacity-100"
                        : "text-slate after:opacity-0 hover:text-navy hover:after:opacity-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={corporateRequestHref}
            className={buttonClass("gold", "!min-h-11 !px-5 max-sm:hidden")}
            onClick={close}
          >
            Request Corporate Training
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-12 items-center justify-center rounded-[3px] border border-field text-navy min-[1180px]:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(12,32,56,0.35)] min-[1180px]:hidden"
      >
        <nav aria-label="Main" className="container-site pb-8 pt-2">
          <ul>
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={close}
                    className={`flex min-h-14 items-center justify-between font-display text-lg font-semibold ${
                      active ? "text-navy" : "text-charcoal"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span aria-hidden="true" className="size-2 bg-gold" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={corporateRequestHref}
            onClick={close}
            className={buttonClass("gold", "mt-6 w-full")}
          >
            Request Corporate Training
          </Link>
          <p className="mt-5 text-[0.9375rem] text-slate">
            Or call{" "}
            <a href={contact.phones[0].href} className="text-link whitespace-nowrap">
              {contact.phones[0].display}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
