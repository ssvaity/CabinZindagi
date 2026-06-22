"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/language-context";
import { Logo } from "./Logo";

export function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // next-themes only knows the real theme after mount; avoid hydration mismatch.
  useEffect(() => setMounted(true), []);
  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);
  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  // Close the menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/impact", label: t.nav.impact },
    { href: "/products", label: t.nav.products },
    { href: "/contact", label: t.nav.contact },
    { href: "/test", label: "Test" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const langButton = (
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="rounded-full px-3 py-1.5 text-xs font-semibold transition hover:text-brandtext"
    >
      {locale === "en" ? "हिंदी" : "EN"}
    </button>
  );

  const themeButton = (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
    >
      <span className="material-symbols-outlined text-xl">
        {mounted && resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-[var(--background)]/85 backdrop-blur dark:border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center" aria-label="Cabin Zindagi — Home">
          <Logo className="h-11 w-auto sm:h-12" />
        </Link>

        <ul className="hidden gap-5 text-sm font-medium lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition hover:text-brandtext ${
                  isActive(link.href)
                    ? "text-brandtext"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Toggles — desktop only */}
          <div className="hidden items-center gap-2 lg:flex">
            {langButton}
            {themeButton}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>
    </header>

      {/* Full-screen mobile menu — rendered outside <header> so its fixed
          position is relative to the viewport (the header's backdrop-blur
          would otherwise become its containing block). */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[var(--background)] px-6 pb-10 pt-24 lg:hidden">
          <ul className="flex flex-col gap-1 text-3xl font-bold tracking-tight">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 transition hover:text-brandtext ${
                    isActive(link.href) ? "text-brandtext" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Toggles live inside the menu on mobile */}
          <div className="mt-auto flex items-center gap-3 border-t border-black/10 pt-6 dark:border-white/10">
            {langButton}
            {themeButton}
          </div>
        </div>
      )}
    </>
  );
}
