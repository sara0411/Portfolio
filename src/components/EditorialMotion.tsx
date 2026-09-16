"use client";

import { useEffect } from "react";

export default function EditorialMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>(".chapter-transition"),
    );
    const contentItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-content]"),
    );
    const projectRows = Array.from(
      document.querySelectorAll<HTMLElement>(".project-row"),
    );
    const signature = document.querySelector<HTMLElement>(
      "[data-motion-signature]",
    );
    const experienceSection = document.querySelector<HTMLElement>(
      "[data-experience-section]",
    );
    let frame = 0;

    const update = () => {
      frame = 0;

      if (reducedMotion.matches) {
        root.dataset.motion = "reduced";
        root.style.removeProperty("--page-progress");
        chapters.forEach((chapter) =>
          chapter.style.removeProperty("--chapter-shift"),
        );
        contentItems.forEach((item) => {
          item.style.removeProperty("--motion-left");
          item.style.removeProperty("--motion-right");
          item.style.removeProperty("--motion-clip");
          item.style.removeProperty("--motion-line");
        });
        projectRows.forEach((project) =>
          project.style.removeProperty("--project-read-progress"),
        );
        signature?.style.removeProperty("--signature-shift");
        experienceSection?.style.removeProperty("--experience-progress");
        return;
      }

      root.dataset.motion = "full";
      const scrollableHeight = Math.max(root.scrollHeight - window.innerHeight, 1);
      const pageProgress = Math.min(
        Math.max(window.scrollY / scrollableHeight, 0),
        1,
      );
      root.style.setProperty("--page-progress", pageProgress.toFixed(5));

      const travel = Math.min(window.innerWidth * 0.34, 430);
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        const progress = Math.min(
          Math.max(
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
            0,
          ),
          1,
        );
        const shift = travel * (1 - progress * 2);
        chapter.style.setProperty("--chapter-shift", `${shift.toFixed(2)}px`);
      });

      contentItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const clipsContent = item.dataset.motionContent !== "split";
        const entryStart = window.innerHeight * 0.98;
        const entryDistance = clipsContent
          ? Math.max(window.innerHeight * 0.14, 80)
          : Math.max(window.innerHeight * 0.48, 260);
        const progress = Math.min(
          Math.max((entryStart - rect.top) / entryDistance, 0),
          1,
        );
        const remaining = 1 - progress;

        item.style.setProperty(
          "--motion-left",
          `${(-54 * remaining).toFixed(2)}px`,
        );
        item.style.setProperty(
          "--motion-right",
          `${(64 * remaining).toFixed(2)}px`,
        );
        item.style.setProperty(
          "--motion-clip",
          `${(100 * remaining).toFixed(2)}%`,
        );
        item.style.setProperty("--motion-line", progress.toFixed(4));
      });

      projectRows.forEach((project) => {
        const rect = project.getBoundingClientRect();
        const progress = Math.min(
          Math.max((96 - rect.top) / Math.max(rect.height - 180, 1), 0),
          1,
        );
        project.style.setProperty(
          "--project-read-progress",
          progress.toFixed(4),
        );
      });

      if (signature) {
        const rect = signature.getBoundingClientRect();
        const progress = Math.min(
          Math.max(
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
            0,
          ),
          1,
        );
        const travel = Math.min(window.innerWidth * 0.24, 320);
        const shift = travel * (0.5 - progress);
        signature.style.setProperty(
          "--signature-shift",
          `${shift.toFixed(2)}px`,
        );
      }

      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        const progress = Math.min(
          Math.max(
            (window.innerHeight * 0.65 - rect.top) /
              Math.max(rect.height - window.innerHeight * 0.2, 1),
            0,
          ),
          1,
        );
        experienceSection.style.setProperty(
          "--experience-progress",
          progress.toFixed(4),
        );
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      delete root.dataset.motion;
      root.style.removeProperty("--page-progress");
      chapters.forEach((chapter) =>
        chapter.style.removeProperty("--chapter-shift"),
      );
      contentItems.forEach((item) => {
        item.style.removeProperty("--motion-left");
        item.style.removeProperty("--motion-right");
        item.style.removeProperty("--motion-clip");
        item.style.removeProperty("--motion-line");
      });
      projectRows.forEach((project) =>
        project.style.removeProperty("--project-read-progress"),
      );
      signature?.style.removeProperty("--signature-shift");
      experienceSection?.style.removeProperty("--experience-progress");
    };
  }, []);

  return null;
}
