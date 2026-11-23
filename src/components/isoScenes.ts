import type * as T from "three";

export type Vec = [number, number, number];

export interface Kit {
  THREE: typeof import("three");
  world: T.Group;
  m: {
    paper: T.MeshLambertMaterial;
    ink: T.MeshLambertMaterial;
    accent: T.MeshLambertMaterial;
    signal: T.MeshBasicMaterial;
    mute: T.MeshBasicMaterial;
    glow: T.MeshBasicMaterial;
  };
  s: {
    ink: T.LineBasicMaterial;
    grid: T.LineBasicMaterial;
    route: T.LineDashedMaterial;
    accent: T.LineBasicMaterial;
    signal: T.LineBasicMaterial;
    trace: T.LineDashedMaterial;
  };
  solid(parent: T.Object3D, geometry: T.BufferGeometry, fill: T.Material, position: Vec, edges?: number | null): T.Mesh;
  box(w: number, h: number, d: number): T.BufferGeometry;
  cyl(top: number, bottom: number, h: number, open?: boolean): T.BufferGeometry;
  ball(radius: number, detail?: number): T.BufferGeometry;
  group(parent: T.Object3D, position: Vec): T.Group;
  path(parent: T.Object3D, points: Vec[], material: T.Material): T.Line;
  outline(parent: T.Object3D, w: number, h: number, position: Vec): T.LineSegments;
  label(text: string, at: Vec | (() => T.Vector3), kind?: "pill" | "note" | "right" | "left"): HTMLElement;
}

export interface Built {
  update(time: number): void;
  /** The moment to show when motion is reduced: every part of the story visible. */
  still: number;
}

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
/** 0 → 1 between a and b. */
const span = (time: number, a: number, b: number) => ease((time - a) / (b - a));

function along(points: T.Vector3[], fraction: number, out: T.Vector3) {
  let total = 0;
  const lengths: number[] = [];
  for (let index = 1; index < points.length; index += 1) {
    const length = points[index].distanceTo(points[index - 1]);
    lengths.push(length);
    total += length;
  }
  let distance = clamp(fraction) * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (distance <= lengths[index] || index === lengths.length - 1) {
      return out.lerpVectors(points[index], points[index + 1], Math.min(distance / lengths[index], 1));
    }
    distance -= lengths[index];
  }
  return out.copy(points[points.length - 1]);
}

function arrow(kit: Kit) {
  const shape = new kit.THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, -0.34);
  shape.lineTo(0.09, -0.25);
  shape.lineTo(0.16, -0.38);
  shape.lineTo(0.21, -0.35);
  shape.lineTo(0.14, -0.23);
  shape.lineTo(0.26, -0.23);
  shape.closePath();
  return new kit.THREE.ShapeGeometry(shape);
}

/* ------------------------------------------------------------------ */
/* Automai: teach → save → generate → run, and tracing a bug back     */
/* ------------------------------------------------------------------ */
function automai(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, cyl } = kit;
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

  // the desktop window where a workflow is taught
  const screen = kit.group(world, [-4.4, 0, 0]);
  solid(screen, box(0.7, 0.06, 0.5), m.paper, [0, 0.03, 0]);
  solid(screen, box(0.1, 0.5, 0.1), m.ink, [0, 0.3, 0], null);
  solid(screen, box(2.3, 1.6, 0.08), m.ink, [0, 1.3, 0]);
  const face = kit.group(screen, [0, 1.3, 0.045]);
  solid(face, box(2.14, 1.44, 0.01), m.paper, [0, 0, 0], null);
  solid(face, box(2.14, 0.12, 0.012), m.mute, [0, 0.66, 0.002], null);
  const targets: { w: number; h: number; at: Vec }[] = [
    { w: 1.2, h: 0.18, at: [-0.2, 0.3, 0.01] },
    { w: 1.2, h: 0.18, at: [-0.2, 0.0, 0.01] },
    { w: 0.14, h: 0.14, at: [-0.73, -0.28, 0.01] },
    { w: 0.46, h: 0.2, at: [-0.57, -0.52, 0.01] },
  ];
  solid(face, box(1.2, 0.18, 0.01), m.paper, targets[0].at);
  solid(face, box(1.2, 0.18, 0.01), m.paper, targets[1].at);
  solid(face, box(0.14, 0.14, 0.01), m.paper, targets[2].at);
  solid(face, box(0.46, 0.2, 0.012), m.accent, targets[3].at, null);
  const found = targets.map((target) => {
    const frame = kit.outline(face, target.w + 0.14, target.h + 0.12, [target.at[0], target.at[1], 0.03]);
    frame.visible = false;
    return frame;
  });
  const cursor = solid(face, arrow(kit), m.ink, [0.6, 0.2, 0.04], 1);

  // the saved profile
  const profile = kit.group(world, [-1.5, 0, 0.2]);
  solid(profile, box(1.3, 0.12, 1.0), m.paper, [0, 0.06, 0]);
  const cards: T.Mesh[] = [];
  for (let index = 0; index < 4; index += 1) {
    const card = solid(profile, box(1.0, 0.05, 0.7), m.paper, [0, 0.15 + index * 0.07, 0]);
    solid(card, cyl(0.06, 0.06, 0.01), m.accent, [-0.36, 0.03, 0], null);
    solid(card, box(0.5, 0.008, 0.06), m.mute, [0.05, 0.03, -0.1], null);
    solid(card, box(0.38, 0.008, 0.06), m.mute, [-0.01, 0.03, 0.08], null);
    cards.push(card);
  }

  // the generated scripts
  const scripts = kit.group(world, [1.4, 0, -0.1]);
  const sheets: T.Mesh[] = [];
  for (let index = 0; index < 3; index += 1) {
    const sheet = solid(scripts, box(1.15, 0.03, 0.85), m.paper, [index * 0.08, 0.03 + index * 0.08, -index * 0.08]);
    [0, 0.12, 0.12, 0.24, 0.12, 0].forEach((indent, row) => {
      solid(sheet, box(0.5 - indent * 0.6, 0.006, 0.05), row === 3 ? m.accent : m.mute, [-0.25 + indent + (0.5 - indent * 0.6) / 2, 0.018, -0.3 + row * 0.12], null);
    });
    sheets.push(sheet);
  }

  // the C++ runtime
  const runtime = kit.group(world, [4.3, 0, 0.1]);
  const slabs: T.Mesh[] = [];
  for (let level = 0; level < 4; level += 1) {
    slabs.push(solid(runtime, box(1.1, 0.3, 1.1), level === 3 ? m.ink : m.paper, [0, 0.17 + level * 0.38, 0]));
  }
  const lamp = solid(runtime, box(0.3, 0.12, 0.3), m.accent, [0, 1.75, 0], null);
  const lampFault = solid(runtime, box(0.32, 0.13, 0.32), m.signal, [0, 1.75, 0], null);

  // the route between them, and the packet that travels it
  const route = [v(-4.4, 0.02, 0.9), v(-1.5, 0.02, 0.9), v(1.4, 0.02, 0.9), v(4.3, 0.02, 0.9)];
  kit.path(world, route.map((point) => [point.x, point.y, point.z] as Vec), s.route);
  const packet = solid(world, box(0.34, 0.05, 0.24), m.signal, [0, 0.08, 0], null);
  const at = new THREE.Vector3();

  // the trace back from where it failed to where it started
  const arc = new THREE.QuadraticBezierCurve3(v(4.3, 2.0, 0.1), v(1.4, 3.6, 0.1), v(-1.5, 0.6, 0.2));
  const arcLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(arc.getPoints(48)), s.trace);
  arcLine.computeLineDistances();
  world.add(arcLine);

  kit.label("teaching", [-4.4, 2.35, 0]);
  kit.label("saved profile", [-1.5, 0.75, 0.2]);
  kit.label("generated scripts", [1.5, 0.55, -0.1]);
  kit.label("C++ runtime", [4.3, 2.1, 0.1]);
  const traced = kit.label("traced back to here", [-1.5, 1.2, 0.2], "note");

  return {
    still: 9.5,
    update(time) {
      const t = time % 11;
      const failing = Math.floor(time / 11) % 2 === 0;

      // 0 – 3.2: the cursor teaches four controls, each is recognised
      const step = Math.min(Math.floor(t / 0.8), 3);
      const target = targets[step];
      const from = targets[Math.max(step - 1, 0)];
      const k = span(t % 0.8, 0, 0.45);
      const resting = t >= 3.2;
      cursor.position.set(
        resting ? 0.6 : from.at[0] + (target.at[0] - from.at[0]) * k + 0.05,
        resting ? 0.2 : from.at[1] + (target.at[1] - from.at[1]) * k - 0.03,
        0.04,
      );
      found.forEach((frame, index) => {
        frame.visible = t < 9.5 && (index < step || (index === step && t % 0.8 > 0.45) || resting);
      });

      // 3.2 – 6.4: the taught steps travel and are written out
      const moving = t >= 3.2 && t < 6.4;
      packet.visible = moving;
      if (moving) {
        along(route, span(t, 3.2, 6.4), at);
        packet.position.set(at.x, 0.08, at.z);
      }
      cards.forEach((card, index) => {
        card.position.y = 0.15 + index * 0.07 + (t > 4 && t < 4.6 && index === 3 ? 0.12 : 0);
      });
      sheets.forEach((sheet, index) => {
        sheet.position.y = 0.03 + index * 0.08 + (t > 5.1 && t < 5.7 && index === 2 ? 0.14 : 0);
      });

      // 6.4 – 8: the runtime runs it
      const running = t >= 6.4 && t < 8;
      slabs.forEach((slab, level) => {
        slab.position.y = 0.17 + level * 0.38 + (running ? Math.sin(t * 22 + level) * 0.025 : 0);
      });
      const fault = failing && t >= 7.6;
      lamp.visible = !fault && (!running || Math.sin(t * 18) > 0);
      lampFault.visible = fault;

      // 8 – 10.5: on a failing run, the trace goes back to the stage that caused it
      const tracing = failing && t >= 8;
      arcLine.visible = tracing;
      arcLine.geometry.setDrawRange(0, Math.floor(49 * span(t, 8, 9.2)));
      traced.style.opacity = tracing && t > 9.1 ? "1" : "0";
      cards[3].material = tracing && t > 9.2 ? m.signal : m.paper;
    },
  };
}

/* ------------------------------------------------------------------ */
/* SAM platform: a question answered from the team's own documents     */
/* ------------------------------------------------------------------ */
function sam(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, ball } = kit;

  // the team's documents
  const pile = kit.group(world, [-3.4, 0, -0.4]);
  const sheets: T.Mesh[] = [];
  for (let index = 0; index < 8; index += 1) {
    const sheet = solid(pile, box(1.1, 0.04, 0.8), m.paper, [0, 0.03 + index * 0.075, 0]);
    sheet.rotation.y = ((index * 37) % 9) / 40 - 0.1;
    solid(sheet, box(0.7, 0.006, 0.05), m.mute, [-0.05, 0.023, -0.2], null);
    solid(sheet, box(0.55, 0.006, 0.05), m.mute, [-0.12, 0.023, 0], null);
    solid(sheet, box(0.62, 0.006, 0.05), m.mute, [-0.09, 0.023, 0.2], null);
    sheets.push(sheet);
  }
  const hits = [2, 5, 7];

  // ChromaDB: a block of stored passages
  const store = kit.group(world, [0, 0, -0.6]);
  const cells: T.Mesh[] = [];
  for (let x = 0; x < 4; x += 1) {
    for (let z = 0; z < 3; z += 1) {
      for (let y = 0; y < 2; y += 1) {
        cells.push(solid(store, box(0.26, 0.26, 0.26), m.paper, [-0.48 + x * 0.32, 0.14 + y * 0.32, -0.32 + z * 0.32]));
      }
    }
  }
  const lit = [5, 13, 18];

  // Ollama, running locally
  const model = kit.group(world, [3.3, 0, -0.4]);
  solid(model, box(1.1, 0.8, 1.0), m.paper, [0, 0.4, 0]);
  solid(model, box(0.5, 0.08, 0.45), m.accent, [0, 0.84, 0]);
  for (let pin = 0; pin < 4; pin += 1) {
    solid(model, box(0.04, 0.04, 0.1), m.ink, [-0.18 + pin * 0.12, 0.84, 0.27], null);
  }

  // the question, and the answer that comes back
  const question = solid(world, box(0.8, 0.05, 0.45), m.paper, [0, 0.06, 2.0]);
  solid(question, box(0.5, 0.008, 0.06), m.mute, [-0.08, 0.03, -0.06], null);
  solid(question, box(0.36, 0.008, 0.06), m.mute, [-0.15, 0.03, 0.08], null);
  const answer = solid(world, box(0.9, 0.05, 0.5), m.signal, [3.3, 0.9, -0.4], null);
  solid(answer, box(0.6, 0.008, 0.06), m.paper, [-0.05, 0.03, -0.1], null);
  solid(answer, box(0.45, 0.008, 0.06), m.paper, [-0.12, 0.03, 0.06], null);

  // the learning path along the front
  const tiles: T.Mesh[] = [];
  ["Course", "Quiz", "Manager validation", "Progress"].forEach((name, index) => {
    const x = -3.3 + index * 2.2;
    tiles.push(solid(world, box(0.8, 0.08, 0.6), m.paper, [x, 0.04, 3.4]));
    kit.label(name, [x, 0.45, 3.4], "note");
  });
  kit.path(world, [[-3.3, 0.02, 3.4], [3.3, 0.02, 3.4]], s.route);
  const walker = solid(world, ball(0.12), m.accent, [0, 0.25, 3.4], null);

  kit.label("team documents", [-3.4, 0.95, -0.4]);
  kit.label("ChromaDB", [0, 0.85, -0.6]);
  kit.label("Ollama, local", [3.3, 1.15, -0.4]);
  const asking = kit.label("a consultant asks", [0, 0.25, 2.0], "note");
  const answered = kit.label("answered from the documents", () => answer.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.25, 0)), "note");

  const start = new THREE.Vector3(0, 0.06, 2.0);
  const into = new THREE.Vector3(0, 0.95, -0.6);
  const home = new THREE.Vector3(3.3, 0.9, -0.4);
  const front = new THREE.Vector3(2.3, 0.08, 1.4);

  return {
    still: 7.2,
    update(time) {
      const t = time % 10;
      // 0 – 1.4: the question goes to the store
      question.position.lerpVectors(start, into, span(t, 0.3, 1.4));
      question.visible = t < 1.6;
      asking.style.opacity = t < 1.2 ? "1" : "0";
      // 1.4 – 2.6: the closest passages light up
      cells.forEach((cell, index) => {
        cell.material = lit.includes(index) && t > 1.4 && t < 8.5 ? m.accent : m.paper;
      });
      // 2.2 – 3.6: the matching pages lift off the pile
      sheets.forEach((sheet, index) => {
        const hit = hits.includes(index);
        const lift = hit ? span(t, 2.2 + hits.indexOf(index) * 0.15, 3.4) * (1 - span(t, 8.2, 9)) : 0;
        sheet.position.set(lift * 1.2, 0.03 + index * 0.075 + lift * 0.5, lift * -0.2);
        sheet.material = hit && lift > 0.5 ? m.accent : m.paper;
      });
      // 3.6 – 5.2: the model writes the answer, and it comes back to the front
      answer.visible = t > 3.8 && t < 9.2;
      answer.position.lerpVectors(home, front, span(t, 4.2, 5.4));
      answered.style.opacity = t > 5.4 && t < 9 ? "1" : "0";
      // all the time: someone working through a course
      const leg = (time % 8) / 2;
      const index = Math.floor(leg);
      const hop = leg - index;
      walker.position.set(-3.3 + Math.min(index + ease(hop / 0.6), 3) * 2.2, 0.25 + Math.sin(Math.PI * clamp(hop / 0.6)) * 0.35, 3.4);
      tiles.forEach((tile, i) => {
        tile.material = i === index ? m.accent : m.paper;
      });
    },
  };
}

/* ------------------------------------------------------------------ */
/* Log classifier: lines in, two bidirectional layers, a label out     */
/* ------------------------------------------------------------------ */
function logs(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, ball } = kit;

  // the stream of log lines
  solid(world, box(4.6, 0.08, 1.0), m.paper, [-3.0, 0.04, 0]);
  const lines: T.Mesh[] = [];
  for (let index = 0; index < 9; index += 1) {
    lines.push(solid(world, box(0.12, 0.04, 0.6 + ((index * 3) % 4) * 0.08), index === 4 ? m.signal : m.ink, [0, 0.1, 0], null));
  }

  // the two layers, each read in both directions
  const layers: { x: number; fwd: T.Mesh; back: T.Mesh }[] = [];
  [0.2, 2.1].forEach((x, index) => {
    solid(world, box(1.3, 0.5 - index * 0.1, 1.3), m.paper, [x, 0.25 - index * 0.05, 0]);
    const fwd = solid(world, ball(0.07), m.accent, [x, 0.6, -0.25], null);
    const back = solid(world, ball(0.07), m.accent, [x, 0.6, 0.25], null);
    layers.push({ x, fwd, back });
  });
  kit.path(world, [[-0.7, 0.3, 0], [-0.45, 0.3, 0]], s.ink);
  kit.path(world, [[0.85, 0.25, 0], [1.45, 0.25, 0]], s.ink);
  kit.path(world, [[2.75, 0.2, 0], [3.3, 0.2, 0]], s.ink);

  // where each line ends up
  const names = ["Normal", "SQL injection", "XSS", "Server error", "Unauthorized access"];
  const trays: T.Mesh[] = [];
  names.forEach((name, index) => {
    const z = -2.0 + index * 1.0;
    trays.push(solid(world, box(1.0, 0.16, 0.7), m.paper, [4.2, 0.08, z]));
    kit.label(name, [4.75, 0.1, z], "right");
  });
  const drop = solid(world, box(0.12, 0.04, 0.5), m.ink, [0, 0, 0], null);

  kit.label("about 1 GB of system logs", [-3.0, 0.4, 0]);
  kit.label("BiLSTM, 128", [0.2, 0.85, 0]);
  kit.label("BiLSTM, 64", [2.1, 0.8, 0]);
  const caught = kit.label("flagged", [4.2, 0.7, -1.0], "note");

  const exit = new THREE.Vector3(3.3, 0.3, 0);
  const tray = new THREE.Vector3();

  return {
    still: 2.6,
    update(time) {
      // lines march along the stream into the first layer
      lines.forEach((line, index) => {
        const p = ((time * 0.55 + index / lines.length) % 1);
        line.position.set(-5.1 + p * 4.3, 0.1, 0);
        line.visible = p < 0.97;
      });
      // inside each layer, one signal reads forwards and one backwards
      layers.forEach(({ x, fwd, back }, index) => {
        const p = (time * 0.9 + index * 0.3) % 1;
        fwd.position.x = x - 0.55 + p * 1.1;
        back.position.x = x + 0.55 - p * 1.1;
      });
      // a classified line drops into its tray; every fourth one is an attack
      const cycle = time % 2;
      const suspicious = Math.floor(time / 2) % 4 === 1;
      const into = suspicious ? 1 : 0;
      tray.set(4.2, 0.2, -2.0 + into * 1.0);
      drop.position.lerpVectors(exit, tray, span(cycle, 0, 0.8));
      drop.position.y += Math.sin(Math.PI * clamp(cycle / 0.8)) * 0.5;
      drop.material = suspicious ? m.signal : m.ink;
      trays.forEach((item, index) => {
        item.material = index === into && cycle > 0.8 && cycle < 1.8 ? (suspicious ? m.signal : m.accent) : m.paper;
      });
      caught.style.opacity = suspicious && cycle > 0.8 ? "1" : "0";
    },
  };
}

/* ------------------------------------------------------------------ */
/* PageMate: a private library, highlights, and reading together       */
/* ------------------------------------------------------------------ */
function pagemate(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, ball } = kit;

  const phone = (x: number, z: number) => {
    const group = kit.group(world, [x, 0, z]);
    solid(group, box(1.3, 0.12, 2.3), m.ink, [0, 0.06, 0]);
    solid(group, box(1.14, 0.01, 2.06), m.paper, [0, 0.125, 0.02], null);
    solid(group, box(0.3, 0.012, 0.05), m.paper, [0, 0.126, -1.08], null);
    [0.9, 0.82, 0.86, 0.6, 0.88, 0.74].forEach((width, row) => {
      solid(group, box(width, 0.006, 0.07), m.mute, [-0.45 + width / 2 - 0.02, 0.133, -0.7 + row * 0.24], null);
    });
    solid(group, box(0.9, 0.006, 0.07), m.mute, [0, 0.133, 0.85], null);
    const progress = solid(group, box(0.9, 0.012, 0.07), m.accent, [0, 0.137, 0.85], null);
    return { group, progress };
  };
  const mine = phone(-1.6, 0.4);
  const theirs = phone(1.7, 0.1);

  const highlight = solid(mine.group, box(0.86, 0.008, 0.14), m.signal, [-0.02, 0.136, -0.22], null);
  const note = solid(mine.group, box(0.18, 0.06, 0.18), m.accent, [0.72, 0.16, -0.22]);

  // private storage, opened only through signed access
  const vault = kit.group(world, [-1.6, 0, -2.8]);
  solid(vault, box(1.2, 0.9, 1.0), m.paper, [0, 0.45, 0]);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 8, 20), m.ink);
  ring.position.set(0, 0.5, 0.51);
  vault.add(ring);
  kit.path(world, [[-1.6, 0.02, -2.2], [-1.6, 0.02, -0.8]], s.route);
  const key = solid(world, ball(0.1), m.signal, [-1.6, 0.12, -2.2], null);

  // the other reader's progress arrives in realtime
  kit.path(world, [[-0.9, 0.02, 0.4], [1.0, 0.02, 0.1]], s.route);
  const pulse = solid(world, ball(0.1), m.accent, [0, 0.12, 0], null);

  kit.label("your library", [-1.6, 0.4, 0.4]);
  kit.label("a friend reading", [1.7, 0.4, 0.1]);
  kit.label("private storage", [-1.6, 1.15, -2.8]);
  kit.label("signed access", [-1.6, 0.3, -1.5], "note");
  kit.label("realtime", [0.05, 0.35, 0.25], "note");

  const a = new THREE.Vector3(-0.9, 0.12, 0.4);
  const b = new THREE.Vector3(1.0, 0.12, 0.1);
  const vaultEnd = new THREE.Vector3(-1.6, 0.12, -2.2);
  const phoneEnd = new THREE.Vector3(-1.6, 0.12, -0.8);

  return {
    still: 6.5,
    update(time) {
      const t = time % 9;
      // the book opens through a signed link
      key.position.lerpVectors(vaultEnd, phoneEnd, span(t, 0, 1.2));
      key.visible = t < 1.3;
      // a line is highlighted and a note added
      highlight.scale.x = Math.max(span(t, 1.4, 2.4), 0.02);
      highlight.position.x = -0.02 - (1 - highlight.scale.x) * 0.43;
      note.scale.setScalar(Math.max(span(t, 2.5, 3.0), 0.001));
      // reading moves on, and the other phone catches up
      const mineProgress = 0.35 + 0.4 * span(t, 3.2, 4.6);
      const theirsProgress = 0.35 + 0.4 * span(t, 5.4, 6.4);
      mine.progress.scale.x = mineProgress;
      mine.progress.position.x = -0.45 * (1 - mineProgress);
      theirs.progress.scale.x = theirsProgress;
      theirs.progress.position.x = -0.45 * (1 - theirsProgress);
      pulse.visible = t > 4.4 && t < 5.6;
      pulse.position.lerpVectors(a, b, span(t, 4.4, 5.5));
      // reset gently
      if (t > 8.4) {
        highlight.scale.x = Math.max(1 - span(t, 8.4, 9), 0.02);
        note.scale.setScalar(Math.max(1 - span(t, 8.4, 8.8), 0.001));
      }
    },
  };
}

/* ------------------------------------------------------------------ */
/* PingPay: four ways to pay, and signing in without credentials       */
/* ------------------------------------------------------------------ */
function pingpay(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, cyl, ball } = kit;

  const phone = kit.group(world, [-2.6, 0, 0]);
  solid(phone, box(1.4, 0.12, 2.4), m.ink, [0, 0.06, 0]);
  solid(phone, box(1.24, 0.01, 2.16), m.paper, [0, 0.125, 0.02], null);
  const methods = ["card", "bank", "ACH", "crypto"];
  const tiles = methods.map((_, index) => {
    const z = -0.6 + index * 0.45;
    const tile = solid(phone, box(1.0, 0.05, 0.34), m.paper, [0, 0.15, z]);
    return tile;
  });

  // Supabase records the payment
  const db = kit.group(world, [1.0, 0, 0]);
  for (let disc = 0; disc < 3; disc += 1) {
    solid(db, cyl(0.6, 0.6, 0.26), m.paper, [0, 0.14 + disc * 0.3, 0]);
  }
  kit.path(world, [[-1.8, 0.02, 0], [0.4, 0.02, 0]], s.route);
  const coin = solid(world, cyl(0.17, 0.17, 0.06), m.signal, [0, 0.1, 0], 30);

  // Paid
  const paid = kit.group(world, [1.0, 1.35, 0]);
  solid(paid, ball(0.24, 0), m.signal, [0, 0, 0], 1);

  // signing in with a proof instead of credentials
  const gate = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 8, 28), m.accent);
  gate.position.set(1.2, 0.48, 2.4);
  gate.rotation.y = Math.PI / 2;
  world.add(gate);
  kit.path(world, [[-1.6, 0.02, 2.4], [3.4, 0.02, 2.4]], s.route);
  const person = solid(world, ball(0.16), m.paper, [-1.6, 0.18, 2.4], null);
  const check = solid(world, box(0.5, 0.06, 0.5), m.paper, [3.4, 0.04, 2.4]);

  kit.label("card, bank, ACH, crypto", [-2.6, 0.5, -1.2]);
  kit.label("Supabase", [1.62, 0.45, 0], "right");
  const paidLabel = kit.label("paid", [1.0, 1.75, 0], "note");
  kit.label("through Stripe, Plaid and Ethers.js", [-0.7, 0.05, 0.45], "note");
  kit.label("proof", [1.2, 1.05, 2.4], "note");
  kit.label("verified, no credentials shared", [3.4, 0.35, 2.4], "note");

  const from = new THREE.Vector3(-1.8, 0.1, 0);
  const to = new THREE.Vector3(0.4, 0.1, 0);
  const walkFrom = new THREE.Vector3(-1.6, 0.18, 2.4);
  const walkTo = new THREE.Vector3(3.4, 0.18, 2.4);

  return {
    still: 1.6,
    update(time) {
      const t = time % 3;
      const chosen = Math.floor(time / 3) % methods.length;
      tiles.forEach((tile, index) => {
        const on = index === chosen;
        tile.material = on ? m.accent : m.paper;
        tile.position.y = 0.15 + (on ? 0.08 * span(t, 0, 0.3) : 0);
      });
      coin.visible = t > 0.4 && t < 1.5;
      coin.position.lerpVectors(from, to, span(t, 0.4, 1.4));
      coin.rotation.x = time * 6;
      paid.visible = t > 1.4;
      paid.scale.setScalar(Math.max(span(t, 1.4, 1.75), 0.001));
      paidLabel.style.opacity = t > 1.5 ? "1" : "0";
      // the sign-in walk loops on its own clock
      const w = (time % 6) / 6;
      person.position.lerpVectors(walkFrom, walkTo, span(w, 0.05, 0.75));
      const through = w > 0.4;
      person.material = through ? m.accent : m.paper;
      check.material = w > 0.74 ? m.accent : m.paper;
      gate.rotation.x = Math.sin(time * 1.4) * 0.05;
    },
  };
}

/* ------------------------------------------------------------------ */
/* Recruitment forum: a CV from the candidate to the recruiter         */
/* ------------------------------------------------------------------ */
function forum(kit: Kit): Built {
  const { THREE, world, m, s, solid, box, cyl, ball } = kit;

  const table = (x: number, z: number) => {
    const group = kit.group(world, [x, 0, z]);
    solid(group, box(1.4, 0.06, 0.8), m.paper, [0, 0.72, 0]);
    solid(group, box(0.06, 0.7, 0.7), m.paper, [-0.64, 0.35, 0]);
    solid(group, box(0.06, 0.7, 0.7), m.paper, [0.64, 0.35, 0]);
    return group;
  };

  // candidates, with their CVs
  const candidates = table(-3.6, 0.4);
  for (let index = 0; index < 4; index += 1) {
    solid(candidates, box(0.4, 0.02, 0.55), m.paper, [0.15, 0.77 + index * 0.03, 0]).rotation.y = index * 0.12;
  }

  // the company's stand at the forum
  const stand = kit.group(world, [0, 0, -0.2]);
  solid(stand, box(1.8, 0.9, 0.7), m.paper, [0, 0.45, 0]);
  for (const x of [-0.8, 0.8]) solid(stand, cyl(0.025, 0.025, 1.5), m.ink, [x, 1.65, -0.3], null);
  solid(stand, box(1.7, 0.45, 0.04), m.accent, [0, 2.2, -0.3]);
  solid(stand, box(0.9, 0.03, 0.045), m.paper, [0, 2.25, -0.3], null);
  const inbox = solid(stand, box(0.7, 0.08, 0.5), m.paper, [0.4, 0.95, 0.05]);

  // the recruiter, evaluating
  const recruiter = table(3.6, 0.4);
  solid(recruiter, box(0.5, 0.02, 0.4), m.paper, [-0.3, 0.76, 0]);
  const marks = [0, 1, 2, 3, 4].map((index) =>
    solid(recruiter, ball(0.08), m.paper, [-0.4 + index * 0.2, 1.25, 0], null),
  );

  // the admin, who sets up forums and companies
  const board = kit.group(world, [0, 0, -3.0]);
  for (const x of [-0.8, 0.8]) solid(board, box(0.06, 1.0, 0.06), m.ink, [x, 0.5, 0], null);
  solid(board, box(1.9, 1.0, 0.06), m.paper, [0, 1.3, 0]);
  for (let row = 0; row < 3; row += 1) {
    solid(board, box(1.4, 0.05, 0.01), row === 0 ? m.accent : m.mute, [0, 1.6 - row * 0.25, 0.035], null);
  }
  kit.path(world, [[0, 0.02, -2.9], [0, 0.02, -0.6]], s.route);

  kit.path(world, [[-3.0, 0.02, 0.4], [-0.9, 0.02, 0.4], [0.9, 0.02, 0.4], [3.0, 0.02, 0.4]], s.route);
  const cv = solid(world, box(0.4, 0.02, 0.52), m.signal, [0, 0, 0], null);
  solid(cv, box(0.24, 0.008, 0.05), m.paper, [-0.03, 0.014, -0.14], null);
  solid(cv, box(0.18, 0.008, 0.05), m.paper, [-0.06, 0.014, 0], null);

  kit.label("candidate", [-3.6, 1.15, 0.4]);
  kit.label("company at the forum", [0, 2.75, -0.2]);
  kit.label("recruiter", [3.6, 1.6, 0.4]);
  kit.label("admin sets up forums and companies", [0, 2.1, -3.0], "note");

  const route = [
    new THREE.Vector3(-3.4, 0.85, 0.4),
    new THREE.Vector3(-1.6, 1.6, 0.2),
    new THREE.Vector3(0.4, 1.05, 0.05),
  ];
  const second = [
    new THREE.Vector3(0.4, 1.05, 0.05),
    new THREE.Vector3(2.2, 1.6, 0.2),
    new THREE.Vector3(3.3, 0.82, 0.4),
  ];
  const at = new THREE.Vector3();

  return {
    still: 6.2,
    update(time) {
      const t = time % 8;
      if (t < 2.4) {
        along(route, span(t, 0.2, 1.6), at);
      } else {
        along(second, span(t, 2.6, 4.0), at);
      }
      cv.position.copy(at);
      cv.visible = t < 7.4;
      inbox.position.y = 0.95 + (t > 1.6 && t < 2.6 ? 0.05 : 0);
      marks.forEach((mark, index) => {
        const on = index < 4 && t > 4.3 + index * 0.25 && t < 7.6;
        mark.material = on ? m.accent : m.paper;
        mark.scale.setScalar(on ? 1.2 : 1);
      });
    },
  };
}

export const SCENES = { automai, sam, logs, pagemate, pingpay, forum };
export type SceneId = keyof typeof SCENES;

