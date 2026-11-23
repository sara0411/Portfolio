"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";
import { SCENES, type Kit, type SceneId, type Vec } from "./isoScenes";

export default function IsoScene({
  scene,
  caption,
  label,
}: {
  scene: SceneId;
  caption: string;
  label: string;
}) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    const start = () =>
      import("three").then((THREE) => {
        if (disposed) return;

        let renderer: T.WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          host.dataset.failed = "true";
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        host.prepend(renderer.domElement);

        const root = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
        camera.position.set(12, 9.8, 12);
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();
        root.add(new THREE.AmbientLight("#ffffff", 2.3));
        const key = new THREE.DirectionalLight("#ffffff", 0.95);
        key.position.set(-4, 10, 6);
        root.add(key);

        const flat = () =>
          new THREE.MeshLambertMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
        const m = {
          paper: flat(),
          ink: flat(),
          accent: flat(),
          signal: new THREE.MeshBasicMaterial(),
          mute: new THREE.MeshBasicMaterial(),
          glow: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.3, depthWrite: false }),
        };
        const s = {
          ink: new THREE.LineBasicMaterial(),
          grid: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 }),
          route: new THREE.LineDashedMaterial({ dashSize: 0.16, gapSize: 0.12 }),
          accent: new THREE.LineBasicMaterial(),
          signal: new THREE.LineBasicMaterial(),
          trace: new THREE.LineDashedMaterial({ dashSize: 0.18, gapSize: 0.12 }),
        };
        const applyTheme = () => {
          const style = getComputedStyle(document.documentElement);
          const read = (name: string) => style.getPropertyValue(name).trim();
          m.paper.color.set(read("--background"));
          m.ink.color.set(read("--text"));
          m.accent.color.set(read("--accent"));
          m.signal.color.set(read("--signal"));
          m.mute.color.set(read("--line"));
          m.glow.color.set(read("--signal"));
          s.ink.color.set(read("--text"));
          s.grid.color.set(read("--line"));
          s.route.color.set(read("--text-muted"));
          s.accent.color.set(read("--accent"));
          s.signal.color.set(read("--signal"));
          s.trace.color.set(read("--signal"));
        };
        applyTheme();

        const world = new THREE.Group();
        root.add(world);

        const labels: { el: HTMLElement; at: Vec | (() => T.Vector3); kind: string }[] = [];
        const kit: Kit = {
          THREE,
          world,
          m,
          s,
          solid(parent, geometry, fill, position, edges = 25) {
            const mesh = new THREE.Mesh(geometry, fill);
            mesh.position.set(...position);
            if (edges !== null) {
              mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, edges), s.ink));
            }
            parent.add(mesh);
            return mesh;
          },
          box: (w, h, d) => new THREE.BoxGeometry(w, h, d),
          cyl: (top, bottom, h, open = false) => new THREE.CylinderGeometry(top, bottom, h, 16, 1, open),
          ball: (radius, detail = 1) => new THREE.IcosahedronGeometry(radius, detail),
          group(parent, position) {
            const group = new THREE.Group();
            group.position.set(...position);
            parent.add(group);
            return group;
          },
          path(parent, points, material) {
            const line = new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(points.map((point) => new THREE.Vector3(...point))),
              material,
            );
            line.computeLineDistances();
            parent.add(line);
            return line;
          },
          outline(parent, w, h, position) {
            const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, 0.001)), s.signal);
            frame.position.set(...position);
            parent.add(frame);
            return frame;
          },
          label(text, at, kind = "pill") {
            const el = document.createElement("span");
            el.className = kind === "pill" ? "iso-label" : "iso-note";
            el.textContent = text;
            el.setAttribute("aria-hidden", "true");
            host.appendChild(el);
            labels.push({ el, at, kind });
            return el;
          },
        };

        const built = SCENES[scene](kit);

        // Fit the camera to what was drawn, then lay the floor under it.
        world.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(world);
        const view = camera.matrixWorldInverse;
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        for (const x of [bounds.min.x, bounds.max.x]) {
          for (const y of [bounds.min.y, bounds.max.y]) {
            for (const z of [bounds.min.z, bounds.max.z]) {
              const corner = new THREE.Vector3(x, y, z).applyMatrix4(view);
              minX = Math.min(minX, corner.x);
              maxX = Math.max(maxX, corner.x);
              minY = Math.min(minY, corner.y);
              maxY = Math.max(maxY, corner.y);
            }
          }
        }
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const spanX = ((maxX - minX) / 2) * 1.08;
        const spanY = ((maxY - minY) / 2) * 1.16;
        const grid = new THREE.GridHelper(16, 16);
        grid.material = s.grid;
        grid.position.y = -0.005;
        world.add(grid);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const anchor = new THREE.Vector3();
        let width = 1;
        let height = 1;
        let visible = true;
        let frame = 0;
        let tilt = 0;
        let tiltTarget = 0;
        const began = performance.now();

        const resize = () => {
          width = host.clientWidth;
          height = host.clientHeight;
          if (!width || !height) return;
          const aspect = width / height;
          let halfW = spanX;
          let halfH = spanY;
          if (halfW / halfH > aspect) halfH = halfW / aspect;
          else halfW = halfH * aspect;
          camera.left = centerX - halfW;
          camera.right = centerX + halfW;
          camera.top = centerY + halfH;
          camera.bottom = centerY - halfH;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          draw();
        };

        const draw = () => {
          const time = reduced ? built.still : (performance.now() - began) / 1000;
          tilt += (tiltTarget - tilt) * 0.08;
          world.rotation.y = tilt * 0.12;
          built.update(time);
          world.updateMatrixWorld();
          renderer.render(root, camera);
          for (const item of labels) {
            const point =
              typeof item.at === "function" ? item.at() : anchor.set(...item.at).applyMatrix4(world.matrixWorld);
            point.project(camera);
            const offset = item.kind === "right" ? "translate(8px, -50%)" : item.kind === "left" ? "translate(calc(-100% - 8px), -50%)" : "translate(-50%, -100%)";
            item.el.style.transform = `${offset} translate(${((point.x * 0.5 + 0.5) * width).toFixed(1)}px, ${((-point.y * 0.5 + 0.5) * height).toFixed(1)}px)`;
          }
        };

        const tick = () => {
          frame = 0;
          draw();
          if (visible && !reduced) frame = window.requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !frame) frame = window.requestAnimationFrame(tick);
        });
        observer.observe(host);

        const themeObserver = new MutationObserver(() => {
          applyTheme();
          draw();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = host.getBoundingClientRect();
          tiltTarget = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        };
        const onLeave = () => {
          tiltTarget = 0;
        };
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
        window.addEventListener("resize", resize);
        resize();
        host.dataset.ready = "true";

        cleanup = () => {
          observer.disconnect();
          themeObserver.disconnect();
          if (frame) window.cancelAnimationFrame(frame);
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("resize", resize);
          root.traverse((object) => {
            const mesh = object as T.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
          });
          Object.values(m).forEach((material) => material.dispose());
          Object.values(s).forEach((material) => material.dispose());
          labels.forEach((item) => item.el.remove());
          renderer.dispose();
          renderer.domElement.remove();
        };
      });

    // Only start a scene once it is close to the screen.
    const lazy = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lazy.disconnect();
          start();
        }
      },
      { rootMargin: "300px 0px" },
    );
    lazy.observe(host);

    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup();
    };
  }, [scene]);

  return (
    <figure className="scene iso-scene" data-reveal>
      <div className="iso" ref={mount} role="img" aria-label={label} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
