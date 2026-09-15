"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import ThemeControl from "./ThemeControl";

const navigationItems = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const links = navigationItems.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={() => {
        if (mobileMenu.current) mobileMenu.current.open = false;
      }}
    >
      {item.label}
    </a>
  ));

  return (
    <header className="site-header">
      <div className="site-header-inner page-width">
        <a className="wordmark" href="#hero" aria-label="Sara Ferraa home">
          <strong>Sara Ferraa</strong>
          <span>Software Engineer</span>
        </a>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {links}
        </nav>
        <div className="header-actions">
          <ThemeControl />
          <a
            className="resume-link"
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <details className="mobile-menu" ref={mobileMenu}>
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">{links}</nav>
          </details>
        </div>
      </div>
    </header>
  );
}
