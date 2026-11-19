"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { initPreviewRuntime } from "@/lib/preview-runtime";

const NAV = [
  { href: "/why-malaysia", label: "Why Malaysia" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/services", label: "Our Services" },
  { href: "/journey", label: "Your Journey" },
  { href: "/about", label: "About" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Soft nav can keep the previous scroll offset. Shared closing CTAs then
    // make every route look like one long page. Force a top landing like MPA.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const jumpTop = () => {
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jumpTop();
    const raf = requestAnimationFrame(jumpTop);
    const t0 = window.setTimeout(jumpTop, 0);
    const t1 = window.setTimeout(jumpTop, 50);
    const t2 = window.setTimeout(() => {
      jumpTop();
      root.style.scrollBehavior = previousBehavior;
    }, 120);

    const menu = rootRef.current?.querySelector(".menu-toggle");
    const nav = rootRef.current?.querySelector("#main-nav");
    menu?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      root.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  useEffect(() => {
    if (!rootRef.current) return;
    return initPreviewRuntime(rootRef.current);
  }, [pathname]);

  return (
    <div ref={rootRef}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="preview-strip">
        <span className="status-dot" /> DESIGN PREVIEW{" "}
        <span className="preview-detail">
          · Explore the experience. Enquiries are not sent.
        </span>
      </div>
      <header className="header">
        <div className="nav glass">
          <Link aria-label="MediConnect home" className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.webp" alt="MediConnect" loading="eager" />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded="false"
            aria-controls="main-nav"
            type="button"
          >
            Menu <span>☰</span>
          </button>
          <nav id="main-nav" aria-label="Main navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button" href="/plan" scroll>
            Plan My Visit
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <div key={pathname}>{children}</div>

      <footer>
        <div className="wrap footer-grid">
          <div>
            <Link className="brand" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.webp" alt="MediConnect" loading="eager" />
            </Link>
            <p>
              Care in Malaysia.
              <br />
              Support from Bangladesh.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/hospitals">Hospitals</Link>
            <Link href="/why-malaysia">Why Malaysia</Link>
            <Link href="/services">Our services</Link>
          </div>
          <div>
            <h3>Plan your visit</h3>
            <Link href="/journey">Your journey</Link>
            <Link href="/costs">Costs &amp; planning</Link>
            <Link href="/contact">Contact &amp; offices</Link>
          </div>
          <div>
            <h3>Close to home</h3>
            <p>
              Banani · Kalabagan
              <br />
              Chattogram
            </p>
            <Link href="/about">Meet MediConnect →</Link>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 MediConnect · Malaysia</span>
          <Link href="/preview-notes">About this preview &amp; image credits</Link>
          <span>English · বাংলা coming later</span>
        </div>
      </footer>

      <button
        className="chat-toggle glass"
        aria-controls="chat-panel"
        aria-expanded="false"
        type="button"
      >
        <span aria-hidden="true">◌</span> Let’s talk
      </button>
      <section
        className="chat-panel glass"
        id="chat-panel"
        hidden
        aria-label="Chat preview"
      >
        <div className="chat-head">
          <strong>MediConnect</strong>
          <button data-close-chat aria-label="Close chat" type="button">
            ×
          </button>
        </div>
        <p className="eyebrow">CHAT PREVIEW</p>
        <h3>What’s on your mind?</h3>
        <p>
          This preview is not connected to a live coordinator. Explore the
          callback experience instead.
        </p>
        <Link className="button" href="/contact">
          Request a Callback
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <dialog id="contact-dialog">
        <button className="dialog-close" aria-label="Close dialog" type="button">
          ×
        </button>
        <p className="eyebrow">DESIGN PREVIEW</p>
        <h2 id="dialog-title">Let’s connect.</h2>
        <p id="dialog-copy">
          Official contact details will be connected before launch. No enquiry
          is sent from this preview.
        </p>
        <Link className="button" href="/contact">
          Preview the callback form
          <span aria-hidden="true">↗</span>
        </Link>
      </dialog>
    </div>
  );
}
