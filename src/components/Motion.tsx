"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      root.classList.remove("motion");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => observer.observe(element));

    const words = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slide]"),
    );

    let frame = 0;

    const tick = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrollable = Math.max(root.scrollHeight - viewport, 1);
      root.style.setProperty(
        "--page-progress",
        Math.min(window.scrollY / scrollable, 1).toFixed(4),
      );

      for (const word of words) {
        const rect = word.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewport + 200) continue;
        const progress = (viewport - rect.top) / (viewport + rect.height);
        word.style.setProperty(
          "--shift",
          `${((0.5 - progress) * 18).toFixed(2)}vw`,
        );
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
