import * as THREE from "three";
import { allNodes, chapterScenes, TONES, type ChapterScene, type Vec3 } from "./spec";
import { tracker } from "./tracker";

// Turns scroll progress into one blended scene state per frame: camera, core,
// node positions/sizes/colours and edge opacity. Updated once per frame by
// <Rig> (useFrame priority -1) and read by the other scene parts.

const nodeIndex = new Map(allNodes.map((n, i) => [n.id, i]));

/** Every edge used anywhere, once. */
export const allEdges: [number, number][] = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  for (const c of chapterScenes)
    for (const [a, b] of c.edges ?? []) {
      const key = [a, b].sort().join("|");
      const ia = nodeIndex.get(a);
      const ib = nodeIndex.get(b);
      if (seen.has(key) || ia === undefined || ib === undefined) continue;
      seen.add(key);
      out.push([ia, ib]);
    }
  return out;
})();
const edgeIndex = new Map(allEdges.map(([a, b], i) => [[allNodes[a].id, allNodes[b].id].sort().join("|"), i]));

// Per-chapter lookups, built once (no allocations in the render loop).
const chapterNodes = chapterScenes.map((c) => new Map(c.nodes.map((n) => [n.id, n])));
const chapterEdges = chapterScenes.map(
  (c) => new Set((c.edges ?? []).map((e) => edgeIndex.get([...e].sort().join("|"))))
);

type NodeState = { pos: THREE.Vector3; size: number; color: THREE.Color };

const state = {
  smooth: 0,
  time: 0,
  core: { scale: 1, opacity: 1 },
  camera: { pos: new THREE.Vector3(0, 0, 6), target: new THREE.Vector3() },
  nodes: allNodes.map<NodeState>(() => ({ pos: new THREE.Vector3(), size: 0, color: new THREE.Color() })),
  edges: allEdges.map(() => 0),
};

export function blend() {
  return state;
}

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const colA = new THREE.Color();
const colB = new THREE.Color();
const toneColor = Object.fromEntries(Object.entries(TONES).map(([k, v]) => [k, new THREE.Color(v)])) as Record<
  keyof typeof TONES,
  THREE.Color
>;

function clampIndex(i: number) {
  return Math.min(Math.max(i, 0), chapterScenes.length - 1);
}

function nodePos(scene: ChapterScene, pos: Vec3, out: THREE.Vector3, time: number) {
  out.set(pos[0], pos[1], pos[2]);
  if (scene.orbit) out.applyAxisAngle(THREE.Object3D.DEFAULT_UP, time * 0.25);
  return out;
}

export function updateBlend(dt: number) {
  state.time += dt;
  // Ease towards the scroll position so fast scrolling still looks smooth.
  state.smooth += (tracker.progress - state.smooth) * (1 - Math.exp(-dt * 6));
  const p = state.smooth;
  const i = Math.floor(p);
  const t = p - i;
  const ia = clampIndex(i);
  const ib = clampIndex(i + 1);
  const A = chapterScenes[ia];
  const B = chapterScenes[ib];

  state.core.scale = THREE.MathUtils.lerp(A.core.scale, B.core.scale, t);
  state.core.opacity = THREE.MathUtils.lerp(A.core.opacity, B.core.opacity, t);
  state.camera.pos.set(...A.camera.pos).lerp(tmpA.set(...B.camera.pos), t);
  state.camera.target.set(...A.camera.target).lerp(tmpA.set(...B.camera.target), t);

  const inA = chapterNodes[ia];
  const inB = chapterNodes[ib];
  allNodes.forEach((n, idx) => {
    const a = inA.get(n.id);
    const b = inB.get(n.id);
    const s = state.nodes[idx];
    if (a) nodePos(A, a.pos, tmpA, state.time);
    if (b) nodePos(B, b.pos, tmpB, state.time);
    if (a && b) s.pos.copy(tmpA).lerp(tmpB, t);
    else if (a) s.pos.copy(tmpA);
    else if (b) s.pos.copy(tmpB);
    const sizeA = a ? (a.size ?? 1) : 0;
    const sizeB = b ? (b.size ?? 1) : 0;
    s.size = THREE.MathUtils.lerp(sizeA, sizeB, t);
    colA.copy(toneColor[a?.tone ?? b?.tone ?? "cyan"]);
    colB.copy(toneColor[b?.tone ?? a?.tone ?? "cyan"]);
    s.color.copy(colA).lerp(colB, t);
  });

  const edgesA = chapterEdges[ia];
  const edgesB = chapterEdges[ib];
  for (let e = 0; e < allEdges.length; e++) {
    state.edges[e] = THREE.MathUtils.lerp(edgesA.has(e) ? 1 : 0, edgesB.has(e) ? 1 : 0, t);
  }
}
