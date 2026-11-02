// Scene spec: one network that changes per chapter. Plain data (no three.js
// import) so both the WebGL scene and the static SVG fallback use it.

export type Vec3 = [number, number, number];
export type Tone = "cyan" | "violet" | "dim";

export type SceneNode = {
  id: string;
  /** Hover label. Facts only. */
  label: string;
  pos: Vec3;
  size?: number;
  tone?: Tone;
};

export type ChapterScene = {
  camera: { pos: Vec3; target: Vec3 };
  /** Wireframe core at the origin. */
  core: { scale: number; opacity: number };
  nodes: SceneNode[];
  edges?: [string, string][];
  /** Nodes circle the core (chapter 0). */
  orbit?: boolean;
};

// Chapter 0: the stack from the hero line, orbiting a wireframe core.
const STACK: [string, string][] = [
  ["flutter", "Flutter"],
  ["fastapi", "FastAPI"],
  ["python", "Python"],
  ["aws", "AWS"],
  ["n8n", "n8n"],
  ["gemini", "Gemini"],
];

function ring(count: number, radius: number, tilt = 0.35): Vec3[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [Math.cos(a) * radius, Math.sin(a) * radius * tilt, Math.sin(a) * radius];
  });
}

const stackRing = ring(STACK.length, 1.9);

export const chapterScenes: ChapterScene[] = [
  {
    camera: { pos: [0, 0.2, 6], target: [0, 0, 0] },
    core: { scale: 1, opacity: 0.9 },
    orbit: true,
    nodes: STACK.map(([id, label], i) => ({ id, label, pos: stackRing[i], size: 1, tone: i % 2 ? "violet" : "cyan" })),
  },
  {
    camera: { pos: [0.8, 0.5, 7.2], target: [0, 0, 0] },
    core: { scale: 0.45, opacity: 0.18 },
    nodes: [
      { id: "bca", label: "BCA · 2021–2024", pos: [-1.7, 0.9, 0.4], size: 0.8, tone: "dim" },
      { id: "mca", label: "MCA · 2024–2026", pos: [1.5, 1.2, -0.6], size: 0.8, tone: "dim" },
      { id: "ecommerce", label: "E-commerce site", pos: [-0.9, -1.1, 0.9], size: 0.7, tone: "dim" },
      { id: "javachat", label: "Java chat app", pos: [0.6, -0.6, 1.4], size: 0.7, tone: "dim" },
      { id: "javabank", label: "Java bank system", pos: [1.9, -1.0, 0.2], size: 0.7, tone: "dim" },
    ],
  },
  // Chapters 2–6 are added in stage 3b. Until then the scene holds chapter 1.
];

/** Every node id used anywhere, in a stable order (one instance each). */
export const allNodes: SceneNode[] = (() => {
  const seen = new Map<string, SceneNode>();
  for (const c of chapterScenes) for (const n of c.nodes) if (!seen.has(n.id)) seen.set(n.id, n);
  return [...seen.values()];
})();

export const TONES: Record<Tone, string> = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  dim: "#5b6b7c",
};
