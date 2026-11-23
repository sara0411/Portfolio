"use client";

import { useEffect, useRef } from "react";

type AreaId = "reading" | "desk" | "stage" | "graduation";

const AREAS: {
  id: AreaId;
  label: string;
  target: string;
  go: string;
  labelHeight: number;
}[] = [
  { id: "reading", label: "where I read", target: "pagemate", go: "PageMate", labelHeight: 2.1 },
  { id: "desk", label: "where I work", target: "projects", go: "my work", labelHeight: 1.75 },
  { id: "stage", label: "GDG Casablanca", target: "community", go: "community", labelHeight: 1.85 },
  { id: "graduation", label: "graduation, 2026", target: "education", go: "education", labelHeight: 1.55 },
];

const NOTES = [
  { id: "city", text: "Casablanca", at: "-0.9,3.45,-5.2" },
  { id: "pagemate", text: "PageMate", at: "-2.85,0.47,0.65" },
];

export default function HeroWorld() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      type Object3D = import("three").Object3D;
      type Material = import("three").Material;
      type Mesh = import("three").Mesh;
      type Group = import("three").Group;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        host.dataset.failed = "true";
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      const focus = new THREE.Vector3(0.2, 0.7, -0.6);
      camera.position.set(focus.x + 12, focus.y + 9.8, focus.z + 12);
      camera.lookAt(focus);

      scene.add(new THREE.AmbientLight("#ffffff", 2.3));
      const key = new THREE.DirectionalLight("#ffffff", 0.95);
      key.position.set(-4, 10, 6);
      scene.add(key);

      // Everything is drawn in the page's own colours.
      const flat = () =>
        new THREE.MeshLambertMaterial({
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
      const fills = {
        paper: flat(),
        ink: flat(),
        accent: flat(),
        signal: new THREE.MeshBasicMaterial(),
        mute: new THREE.MeshBasicMaterial(),
        glow: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.18, depthWrite: false }),
      };
      const strokes = {
        ink: new THREE.LineBasicMaterial(),
        grid: new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 }),
        route: new THREE.LineDashedMaterial({ dashSize: 0.16, gapSize: 0.12 }),
        sea: new THREE.LineBasicMaterial(),
      };
      const applyTheme = () => {
        const style = getComputedStyle(document.documentElement);
        const read = (name: string) => style.getPropertyValue(name).trim();
        fills.paper.color.set(read("--background"));
        fills.ink.color.set(read("--text"));
        fills.accent.color.set(read("--accent"));
        fills.signal.color.set(read("--signal"));
        fills.mute.color.set(read("--line"));
        fills.glow.color.set(read("--signal"));
        strokes.ink.color.set(read("--text"));
        strokes.grid.color.set(read("--line"));
        strokes.route.color.set(read("--text-muted"));
        strokes.sea.color.set(read("--accent"));
      };
      applyTheme();

      const world = new THREE.Group();
      scene.add(world);

      const solid = (
        parent: Object3D,
        geometry: import("three").BufferGeometry,
        fill: Material,
        position: [number, number, number],
        edges: number | null = 25,
      ) => {
        const mesh = new THREE.Mesh(geometry, fill);
        mesh.position.set(...position);
        if (edges !== null) {
          mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, edges), strokes.ink));
        }
        parent.add(mesh);
        return mesh;
      };
      const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
      const cyl = (top: number, bottom: number, h: number, open = false) =>
        new THREE.CylinderGeometry(top, bottom, h, 16, 1, open);
      const ball = (radius: number, detail = 0) => new THREE.IcosahedronGeometry(radius, detail);

      const areas = new Map<AreaId, Group>();
      const area = (id: AreaId, x: number, z: number) => {
        const group = new THREE.Group();
        group.position.set(x, 0, z);
        group.userData.area = id;
        world.add(group);
        areas.set(id, group);
        return group;
      };

      // Floor
      const grid = new THREE.GridHelper(12, 12);
      grid.material = strokes.grid;
      world.add(grid);

      // ---------------- where I read ----------------
      const reading = area("reading", -2.9, 0.5);
      solid(reading, box(2.6, 0.03, 2.1), fills.paper, [0, 0.015, 0]);
      for (const z of [-0.8, 0.8]) {
        solid(reading, box(2.3, 0.004, 0.05), fills.mute, [0, 0.034, z], null);
      }
      // armchair
      solid(reading, box(1, 0.32, 0.9), fills.paper, [0, 0.16, 0.05]);
      solid(reading, box(0.72, 0.1, 0.7), fills.paper, [0, 0.37, 0.12]);
      solid(reading, box(1, 0.82, 0.2), fills.paper, [0, 0.41, -0.4]);
      solid(reading, box(0.16, 0.5, 0.9), fills.paper, [-0.42, 0.25, 0.05]);
      solid(reading, box(0.16, 0.5, 0.9), fills.paper, [0.42, 0.25, 0.05]);
      // PageMate on the seat
      const phone = new THREE.Group();
      phone.position.set(0.05, 0.43, 0.15);
      phone.rotation.y = -0.4;
      reading.add(phone);
      solid(phone, box(0.24, 0.03, 0.42), fills.ink, [0, 0, 0]);
      solid(phone, box(0.2, 0.004, 0.36), fills.paper, [0, 0.017, 0], null);
      for (let line = 0; line < 4; line += 1) {
        solid(phone, box(line === 1 ? 0.1 : 0.14, 0.003, 0.025), line === 1 ? fills.signal : fills.mute, [line === 1 ? -0.02 : 0, 0.021, -0.11 + line * 0.07], null);
      }
      // bookshelf
      const shelf = new THREE.Group();
      shelf.position.set(-1.05, 0, -0.55);
      reading.add(shelf);
      solid(shelf, box(0.34, 1.55, 0.95), fills.paper, [0, 0.775, 0]);
      solid(shelf, box(0.3, 0.03, 0.88), fills.paper, [0.03, 0.62, 0]);
      solid(shelf, box(0.3, 0.03, 0.88), fills.paper, [0.03, 1.12, 0]);
      const spines = [0.1, 0.08, 0.11, 0.07, 0.09, 0.1, 0.08];
      for (const [shelfY, offset] of [[0.04, 0], [0.64, 2], [1.14, 4]] as [number, number][]) {
        let z = -0.38;
        spines.forEach((width, index) => {
          if (z > 0.3) return;
          const height = 0.32 + ((index + offset) % 3) * 0.07;
          const fill = (index + offset) % 3 === 0 ? fills.accent : (index + offset) % 3 === 1 ? fills.paper : fills.ink;
          solid(shelf, box(0.24, height, width), fill, [0.05, shelfY + height / 2, z + width / 2], 30);
          z += width + 0.012;
        });
      }
      // floor lamp
      const lamp = new THREE.Group();
      lamp.position.set(0.85, 0, -0.55);
      reading.add(lamp);
      solid(lamp, cyl(0.18, 0.2, 0.04), fills.paper, [0, 0.02, 0]);
      solid(lamp, cyl(0.022, 0.022, 1.55), fills.ink, [0, 0.8, 0], null);
      solid(lamp, cyl(0.15, 0.3, 0.32, true), fills.paper, [0, 1.68, 0]);
      const bulb = solid(lamp, ball(0.08, 1), fills.signal, [0, 1.6, 0], null);
      const pool = new THREE.Mesh(new THREE.CircleGeometry(0.75, 32), fills.glow);
      pool.rotation.x = -Math.PI / 2;
      pool.position.set(0.5, 0.036, -0.1);
      reading.add(pool);
      // an open book on the rug, one page turning
      const book = new THREE.Group();
      book.position.set(0.6, 0.045, 0.7);
      book.rotation.y = -0.5;
      reading.add(book);
      solid(book, box(0.3, 0.02, 0.4), fills.paper, [-0.16, 0, 0]);
      solid(book, box(0.3, 0.02, 0.4), fills.paper, [0.16, 0, 0]);
      const leaf = new THREE.Group();
      leaf.position.set(0, 0.014, 0);
      book.add(leaf);
      solid(leaf, box(0.29, 0.006, 0.38), fills.paper, [0.15, 0, 0]);

      // ---------------- where I work ----------------
      const desk = area("desk", 0.4, 2.75);
      solid(desk, box(1.9, 0.07, 0.95), fills.paper, [0, 0.78, 0]);
      solid(desk, box(0.06, 0.75, 0.88), fills.paper, [-0.9, 0.375, 0]);
      solid(desk, box(0.06, 0.75, 0.88), fills.paper, [0.9, 0.375, 0]);
      solid(desk, box(1.74, 0.3, 0.04), fills.paper, [0, 0.6, -0.42]);
      solid(desk, box(0.75, 0.035, 0.5), fills.ink, [-0.12, 0.832, 0.06]);
      const lid = new THREE.Group();
      lid.position.set(-0.12, 0.85, -0.19);
      lid.rotation.x = -0.22;
      desk.add(lid);
      solid(lid, box(0.75, 0.5, 0.025), fills.ink, [0, 0.25, 0]);
      solid(lid, box(0.68, 0.43, 0.004), fills.paper, [0, 0.25, 0.015], null);
      const screenLines: Mesh[] = [];
      for (let line = 0; line < 3; line += 1) {
        screenLines.push(solid(lid, box(0.36 - line * 0.08, 0.025, 0.004), fills.mute, [-0.12 + line * 0.04 - 0.02, 0.4 - line * 0.07, 0.019], null));
      }
      const caret = solid(lid, box(0.02, 0.05, 0.004), fills.accent, [0.06, 0.26, 0.019], null);
      solid(desk, cyl(0.075, 0.065, 0.16), fills.paper, [0.55, 0.895, 0.15]);
      solid(desk, box(0.34, 0.012, 0.46), fills.paper, [0.52, 0.821, -0.18]);
      solid(desk, cyl(0.24, 0.24, 0.06), fills.paper, [-0.1, 0.5, 0.75]);
      solid(desk, cyl(0.03, 0.03, 0.45), fills.ink, [-0.1, 0.25, 0.75], null);
      solid(desk, cyl(0.22, 0.22, 0.03), fills.paper, [-0.1, 0.015, 0.75]);

      // ---------------- GDG Casablanca ----------------
      const stage = area("stage", 3.45, 0.35);
      solid(stage, box(1.8, 0.25, 1.1), fills.paper, [0, 0.125, -0.5]);
      for (const x of [-0.7, 0.7]) {
        solid(stage, cyl(0.022, 0.022, 1.25), fills.ink, [x, 0.875, -0.95], null);
      }
      solid(stage, box(1.32, 0.42, 0.03), fills.accent, [0, 1.3, -0.95]);
      solid(stage, box(0.9, 0.04, 0.032), fills.paper, [0, 1.36, -0.95], null);
      solid(stage, box(0.6, 0.04, 0.032), fills.paper, [0, 1.25, -0.95], null);
      const mic = new THREE.Group();
      mic.position.set(0, 0.25, -0.3);
      stage.add(mic);
      solid(mic, cyl(0.12, 0.12, 0.03), fills.paper, [0, 0.015, 0]);
      solid(mic, cyl(0.014, 0.014, 0.72), fills.ink, [0, 0.38, 0], null);
      const head = solid(mic, ball(0.065, 1), fills.ink, [0, 0.78, 0.02], null);
      head.scale.set(1, 1.25, 1);
      const audience: Group[] = [];
      for (let row = 0; row < 2; row += 1) {
        for (let seat = 0; seat < 3; seat += 1) {
          const x = -0.55 + seat * 0.55;
          const z = 0.45 + row * 0.5;
          solid(stage, box(0.28, 0.04, 0.26), fills.paper, [x, 0.3, z]);
          solid(stage, box(0.28, 0.3, 0.035), fills.paper, [x, 0.47, z + 0.13]);
          solid(stage, box(0.04, 0.28, 0.04), fills.ink, [x, 0.14, z], null);
          const person = new THREE.Group();
          person.position.set(x, 0.32, z);
          stage.add(person);
          solid(person, box(0.18, 0.22, 0.12), seat === 1 && row === 0 ? fills.accent : fills.paper, [0, 0.11, 0.02]);
          solid(person, ball(0.075, 1), fills.paper, [0, 0.3, 0.02], null);
          person.scale.setScalar(0.001);
          audience.push(person);
        }
      }

      // ---------------- graduation, 2026 ----------------
      const graduation = area("graduation", 1.2, -2.35);
      solid(graduation, box(1.2, 0.12, 1.2), fills.paper, [0, 0.06, 0]);
      solid(graduation, box(0.86, 0.56, 0.86), fills.paper, [0, 0.4, 0]);
      const cap = new THREE.Group();
      cap.position.set(0, 0.68, 0);
      cap.rotation.y = 0.62;
      graduation.add(cap);
      solid(cap, new THREE.CylinderGeometry(0.28, 0.33, 0.2, 8), fills.ink, [0, 0.1, 0]);
      solid(cap, box(0.82, 0.04, 0.82), fills.ink, [0, 0.22, 0]);
      solid(cap, cyl(0.04, 0.04, 0.03), fills.accent, [0, 0.255, 0], null);
      solid(cap, box(0.38, 0.015, 0.025), fills.accent, [0.2, 0.25, 0], null);
      const tassel = new THREE.Group();
      tassel.position.set(0.39, 0.24, 0);
      cap.add(tassel);
      solid(tassel, box(0.025, 0.32, 0.025), fills.accent, [0, -0.16, 0], null);
      solid(tassel, new THREE.ConeGeometry(0.055, 0.16, 6), fills.accent, [0, -0.38, 0], null);
      const bouquet = new THREE.Group();
      bouquet.position.set(0.95, 0, 0.45);
      graduation.add(bouquet);
      solid(bouquet, cyl(0.17, 0.12, 0.36), fills.paper, [0, 0.18, 0]);
      const wrap = solid(bouquet, new THREE.ConeGeometry(0.42, 0.7, 7, 1, true), fills.paper, [0, 0.66, 0]);
      wrap.rotation.x = Math.PI;
      const blooms: Mesh[] = [];
      [
        [0, 1.06, 0, 0.17],
        [0.2, 0.98, 0.08, 0.13],
        [-0.19, 0.97, 0.1, 0.14],
        [0.05, 0.96, -0.2, 0.13],
        [-0.12, 0.93, -0.16, 0.11],
        [0.1, 0.93, 0.22, 0.12],
      ].forEach(([x, y, z, radius], index) => {
        const bloom = solid(bouquet, ball(radius, 0), index % 3 === 0 ? fills.accent : fills.paper, [x, y, z], 1);
        bloom.rotation.set(x * 4, y, z * 4);
        blooms.push(bloom);
      });

      // ---------------- Casablanca, along the back ----------------
      const city = new THREE.Group();
      city.position.set(0, 0, -5.1);
      world.add(city);
      const minaret = new THREE.Group();
      minaret.position.set(-0.9, 0, -0.1);
      minaret.scale.setScalar(0.72);
      city.add(minaret);
      solid(minaret, box(1.5, 0.18, 1.5), fills.paper, [0, 0.09, 0]);
      solid(minaret, box(0.72, 3.3, 0.72), fills.paper, [0, 1.83, 0]);
      for (const y of [1.0, 2.0, 3.05]) {
        solid(minaret, box(0.74, 0.05, 0.74), fills.accent, [0, y, 0], null);
      }
      for (const y of [1.45, 2.5]) {
        solid(minaret, box(0.2, 0.36, 0.01), fills.mute, [0, y, 0.365], null);
        solid(minaret, box(0.01, 0.36, 0.2), fills.mute, [0.365, y, 0], null);
      }
      solid(minaret, box(0.36, 0.5, 0.36), fills.paper, [0, 3.73, 0]);
      solid(minaret, new THREE.ConeGeometry(0.22, 0.26, 4), fills.accent, [0, 4.11, 0]).rotation.y = Math.PI / 4;
      solid(minaret, cyl(0.008, 0.008, 0.36), fills.ink, [0, 4.4, 0], null);
      for (const y of [4.3, 4.39, 4.48]) {
        solid(minaret, ball(0.035, 1), fills.signal, [0, y, 0], null);
      }
      solid(city, box(1.6, 0.16, 0.5), fills.paper, [0.4, 0.08, 0.35]);
      [
        [-2.6, 0.6, 0.7],
        [-3.4, 0.85, 0.6],
        [-4.2, 0.5, 0.75],
        [1.7, 0.5, 0.7],
        [2.5, 0.8, 0.6],
      ].forEach(([x, height, width]) => {
        solid(city, box(width, height, 0.6), fills.paper, [x, height / 2, 0.1]);
      });
      const waves: import("three").Line[] = [];
      for (let row = 0; row < 3; row += 1) {
        const points: import("three").Vector3[] = [];
        for (let step = 0; step <= 60; step += 1) {
          points.push(new THREE.Vector3(-6 + step * 0.2, 0.01, -0.85 - row * 0.32));
        }
        const wave = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), strokes.sea);
        city.add(wave);
        waves.push(wave);
      }

      // ---------------- the paths between them ----------------
      const loop = [
        [-2.9, 0.5],
        [0.4, 0.5],
        [0.4, 2.75],
        [3.45, 2.75],
        [3.45, -2.35],
        [1.2, -2.35],
        [-2.9, -2.35],
        [-2.9, 0.5],
      ].map(([x, z]) => new THREE.Vector3(x, 0.006, z));
      const route = new THREE.Line(new THREE.BufferGeometry().setFromPoints(loop), strokes.route);
      route.computeLineDistances();
      world.add(route);
      for (const corner of [loop[1], loop[3], loop[6]]) {
        solid(world, cyl(0.09, 0.09, 0.02), fills.paper, [corner.x, 0.01, corner.z]);
      }
      const runner = solid(world, ball(0.1, 0), fills.signal, [0, 0.1, 0], null);
      const segments: number[] = [];
      let routeLength = 0;
      for (let index = 1; index < loop.length; index += 1) {
        const length = loop[index].distanceTo(loop[index - 1]);
        segments.push(length);
        routeLength += length;
      }

      // ---------------- interaction ----------------
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const buttons = new Map<AreaId, HTMLButtonElement>();
      host.querySelectorAll<HTMLButtonElement>("[data-area]").forEach((button) => {
        buttons.set(button.dataset.area as AreaId, button);
      });
      const notes = Array.from(host.querySelectorAll<HTMLElement>("[data-note]"));
      const pickables: Object3D[] = [];
      areas.forEach((group) => group.traverse((child) => {
        if ((child as Mesh).isMesh) pickables.push(child);
      }));
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const started = performance.now();
      const clicked = new Map<AreaId, number>();
      let hovered: AreaId | null = null;
      let tiltX = 0;
      let tiltY = 0;
      let tiltTargetX = 0;
      let tiltTargetY = 0;
      let turn = 0;
      let turnTarget = 0;
      let down: { x: number; y: number; type: string } | null = null;
      let dragged = false;
      let visible = true;
      let frame = 0;
      let width = 1;
      let height = 1;
      const anchor = new THREE.Vector3();

      const areaAt = (clientX: number, clientY: number): AreaId | null => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(pickables, false)[0];
        let node: Object3D | null = hit ? hit.object : null;
        while (node && !node.userData.area) node = node.parent;
        return node ? (node.userData.area as AreaId) : null;
      };

      const jump = (id: AreaId) => {
        const target = document.getElementById(AREAS.find((item) => item.id === id)!.target);
        target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      };

      const activate = (id: AreaId) => {
        if (reduced) {
          jump(id);
          return;
        }
        clicked.set(id, performance.now());
        schedule();
        window.setTimeout(() => jump(id), 1150);
      };

      const setHover = (id: AreaId | null) => {
        if (id === hovered) return;
        if (hovered) delete buttons.get(hovered)?.dataset.hover;
        hovered = id;
        if (id) buttons.get(id)!.dataset.hover = "true";
        host.dataset.pointer = id ? "true" : "";
        schedule();
      };

      const ease = (value: number) => 1 - Math.pow(1 - Math.min(Math.max(value, 0), 1), 3);
      const since = (id: AreaId, now: number) => {
        const start = clicked.get(id);
        return start === undefined ? Infinity : (now - start) / 1000;
      };

      const resize = () => {
        width = host.clientWidth;
        height = host.clientHeight;
        if (!width || !height) return;
        const aspect = width / height;
        const half = Math.max(3.9, 5.5 / aspect);
        camera.left = -half * aspect;
        camera.right = half * aspect;
        camera.top = half;
        camera.bottom = -half;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        draw();
      };

      const draw = () => {
        const now = performance.now();
        const time = reduced ? 4 : (now - started) / 1000;
        const busy = !reduced;

        // the scene settles in on load
        const intro = reduced ? 1 : ease(time / 1.3);
        world.scale.setScalar(0.86 + 0.14 * intro);

        tiltX += (tiltTargetX - tiltX) * 0.08;
        tiltY += (tiltTargetY - tiltY) * 0.08;
        turn += (turnTarget - turn) * 0.1;
        world.rotation.set(tiltY * 0.06, turn + tiltX * 0.12, 0);

        areas.forEach((group, id) => {
          const lift = id === hovered ? 0.2 : 0;
          group.position.y += (lift - group.position.y) * 0.18;
        });

        // where I read: the lamp glows, a page turns
        const readT = since("reading", now);
        const lampOn = readT < 4;
        const glow = lampOn ? 0.42 : 0.14 + 0.05 * Math.sin(time * 1.6);
        fills.glow.opacity = glow;
        bulb.scale.setScalar(lampOn ? 1.5 : 1);
        const swingPage = (c: number, turnTime: number, hold: number) =>
          c < turnTime ? ease(c / turnTime) : c < turnTime + hold ? 1 : c < 2 * turnTime + hold ? 1 - ease((c - turnTime - hold) / turnTime) : 0;
        leaf.rotation.z = Math.PI * (readT < 1.8 ? swingPage(readT, 0.7, 0.4) : swingPage(time % 8, 1.2, 2.8));

        // where I work: the laptop opens
        const deskT = since("desk", now);
        if (deskT < 1.5) {
          lid.rotation.x = deskT < 0.45 ? -0.22 + (1.57 + 0.22) * ease(deskT / 0.45) : 1.57 - (1.57 + 0.22) * ease((deskT - 0.45) / 1);
        } else {
          lid.rotation.x = -0.22;
        }
        caret.visible = reduced || Math.sin(time * 6) > 0;
        screenLines.forEach((line, index) => {
          line.scale.x = deskT < 3 ? Math.min(Math.max((deskT - 1 - index * 0.25) / 0.4, 0.05), 1) : 1;
        });

        // GDG Casablanca: the mic bobs, the seats fill
        const stageT = since("stage", now);
        mic.position.y = 0.25 + (stageT < 1.2 ? Math.abs(Math.sin(stageT * 10)) * 0.08 * (1 - stageT / 1.2) : 0);
        audience.forEach((person, index) => {
          const seated = index === 1 || index === 5;
          let scale = seated ? 1 : 0.001;
          if (stageT < 6) {
            const pop = ease((stageT - 0.15 - index * 0.12) / 0.35);
            const leave = stageT > 5 ? 1 - ease((stageT - 5) / 0.6) : 1;
            scale = seated ? 1 : Math.max(pop * leave, 0.001);
          }
          person.scale.setScalar(scale);
        });

        // graduation: the tassel swings, the flowers open
        const gradT = since("graduation", now);
        const swing = gradT < 2.5 ? 0.9 * Math.exp(-gradT * 1.6) : 0;
        tassel.rotation.z = Math.sin(time * 1.4) * 0.12 + Math.sin(gradT * 9) * swing;
        blooms.forEach((bloom, index) => {
          const open = gradT < 1.6 ? Math.sin(Math.PI * Math.min(Math.max((gradT - index * 0.06) / 0.9, 0), 1)) * 0.45 : 0;
          bloom.scale.setScalar(1 + open);
        });

        // Casablanca: the sea moves
        waves.forEach((wave, row) => {
          const position = wave.geometry.attributes.position;
          for (let step = 0; step < position.count; step += 1) {
            const x = position.getX(step);
            position.setZ(step, -0.85 - row * 0.32 + Math.sin(x * 1.6 + time * 1.2 + row) * 0.07);
          }
          position.needsUpdate = true;
        });

        // a dot walks the paths between the four places
        let distance = (time * 1.5) % routeLength;
        for (let index = 0; index < segments.length; index += 1) {
          if (distance <= segments[index]) {
            runner.position.lerpVectors(loop[index], loop[index + 1], distance / segments[index]);
            break;
          }
          distance -= segments[index];
        }
        runner.position.y = 0.1;
        runner.visible = !reduced;

        world.updateMatrixWorld();
        renderer.render(scene, camera);

        const place = (element: HTMLElement, point: import("three").Vector3) => {
          point.project(camera);
          element.style.transform = `translate(-50%, -100%) translate(${((point.x * 0.5 + 0.5) * width).toFixed(1)}px, ${((-point.y * 0.5 + 0.5) * height).toFixed(1)}px)`;
        };
        AREAS.forEach((item) => {
          const group = areas.get(item.id)!;
          place(buttons.get(item.id)!, group.localToWorld(anchor.set(0, item.labelHeight, 0)));
        });
        notes.forEach((note) => {
          const [x, y, z] = (note.dataset.note ?? "0,0,0").split(",").map(Number);
          place(note, anchor.set(x, y, z).applyMatrix4(world.matrixWorld));
          if (note.dataset.side === "right") {
            note.style.transform = note.style.transform.replace("translate(-50%, -100%)", "translate(10px, -50%)");
          }
        });

        return busy;
      };

      const tick = () => {
        frame = 0;
        const busy = draw();
        if (visible && busy) frame = window.requestAnimationFrame(tick);
      };
      function schedule() {
        if (!frame && visible) frame = window.requestAnimationFrame(tick);
      }

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      });
      observer.observe(host);

      const themeObserver = new MutationObserver(() => {
        applyTheme();
        draw();
      });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      const hero = host.closest("section") ?? host;
      const onTilt = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        tiltTargetX = (event.clientX / window.innerWidth - 0.5) * 2;
        tiltTargetY = (event.clientY / window.innerHeight - 0.5) * 2;
        schedule();
      };
      const onLeave = () => {
        tiltTargetX = 0;
        tiltTargetY = 0;
        setHover(null);
      };
      const canvas = renderer.domElement;
      const onDown = (event: PointerEvent) => {
        down = { x: event.clientX, y: event.clientY, type: event.pointerType };
        dragged = false;
        if (event.pointerType === "mouse") canvas.setPointerCapture(event.pointerId);
      };
      const onMove = (event: PointerEvent) => {
        if (down && down.type === "mouse") {
          if (Math.abs(event.clientX - down.x) > 4) dragged = true;
          if (dragged) {
            turnTarget = Math.min(Math.max(turnTarget + event.movementX * 0.006, -0.8), 0.8);
            host.dataset.dragging = "true";
            schedule();
            return;
          }
        }
        if (event.pointerType === "mouse") setHover(areaAt(event.clientX, event.clientY));
      };
      const onUp = (event: PointerEvent) => {
        const start = down;
        down = null;
        delete host.dataset.dragging;
        if (!start || dragged) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
        const id = areaAt(event.clientX, event.clientY);
        if (id) activate(id);
      };
      const onCancel = () => {
        down = null;
        delete host.dataset.dragging;
      };
      const onButton = (event: Event) => {
        const id = (event.currentTarget as HTMLElement).dataset.area as AreaId;
        activate(id);
      };
      const onButtonEnter = (event: Event) => setHover((event.currentTarget as HTMLElement).dataset.area as AreaId);

      hero.addEventListener("pointermove", onTilt as EventListener);
      hero.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onCancel);
      buttons.forEach((button) => {
        button.addEventListener("click", onButton);
        button.addEventListener("pointerenter", onButtonEnter);
        button.addEventListener("focus", onButtonEnter);
      });
      window.addEventListener("resize", resize);
      resize();
      schedule();
      host.dataset.ready = "true";

      cleanup = () => {
        observer.disconnect();
        themeObserver.disconnect();
        if (frame) window.cancelAnimationFrame(frame);
        hero.removeEventListener("pointermove", onTilt as EventListener);
        hero.removeEventListener("pointerleave", onLeave);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onCancel);
        buttons.forEach((button) => {
          button.removeEventListener("click", onButton);
          button.removeEventListener("pointerenter", onButtonEnter);
          button.removeEventListener("focus", onButtonEnter);
        });
        window.removeEventListener("resize", resize);
        scene.traverse((object) => {
          const mesh = object as Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
        });
        Object.values(fills).forEach((material) => material.dispose());
        Object.values(strokes).forEach((material) => material.dispose());
        renderer.dispose();
        canvas.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <figure className="desk-figure">
      <div className="desk" ref={mount}>
        {AREAS.map((item) => (
          <button
            className="desk-label"
            data-area={item.id}
            key={item.id}
            type="button"
            aria-label={`${item.label}: go to ${item.go}`}
          >
            {item.label}
          </button>
        ))}
        {NOTES.map((note) => (
          <span
            className="desk-note"
            data-note={note.at}
            data-side={note.id === "pagemate" ? "right" : undefined}
            key={note.id}
            aria-hidden="true"
          >
            {note.text}
          </span>
        ))}
      </div>
      <figcaption>
        My corner of Casablanca. Click a place to go there.
        <span className="desk-hint"> Drag to turn it.</span>
      </figcaption>
    </figure>
  );
}
