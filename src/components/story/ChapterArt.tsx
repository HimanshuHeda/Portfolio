import { chapterScenes, TONES, type ChapterScene, type Vec3 } from "@/components/scene/spec";

// Static 2D version of a chapter's scene, drawn from the same spec as the
// WebGL scene. Shown when 3D is off (no WebGL, reduced motion, Save-Data,
// low-end device, or before the 3D chunk loads). Decorative: aria-hidden.

const SIZE = 400;

function project(p: Vec3, scene: ChapterScene): [number, number, number] {
  const dist = scene.camera.pos[2] - p[2];
  const f = (SIZE * 0.9) / Math.max(dist, 1);
  return [SIZE / 2 + p[0] * f, SIZE / 2 - p[1] * f, f / ((SIZE * 0.9) / scene.camera.pos[2])];
}

export default function ChapterArt({ index }: { index: number }) {
  const scene = chapterScenes[index];
  if (!scene) return <div className="chapter-art" aria-hidden="true" />;

  const nodes = scene.nodes.map((n) => ({ ...n, xy: project(n.pos, scene) }));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const coreR = 70 * scene.core.scale;

  return (
    <div className="chapter-art" aria-hidden="true">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="presentation" focusable="false">
        {scene.core.scale > 0 && (
          <g opacity={scene.core.opacity} stroke={TONES.cyan} fill="none" strokeWidth="1">
            <polygon points={hexPoints(SIZE / 2, SIZE / 2, coreR)} />
            <polygon points={hexPoints(SIZE / 2, SIZE / 2, coreR * 0.62, 30)} />
            <line x1={SIZE / 2 - coreR} y1={SIZE / 2} x2={SIZE / 2 + coreR} y2={SIZE / 2} />
            <line x1={SIZE / 2} y1={SIZE / 2 - coreR} x2={SIZE / 2} y2={SIZE / 2 + coreR} />
          </g>
        )}
        {scene.orbit && (
          <ellipse cx={SIZE / 2} cy={SIZE / 2} rx={150} ry={52} fill="none" stroke={TONES.dim} strokeDasharray="3 6" />
        )}
        {scene.edges?.map(([a, b]) => {
          const A = byId.get(a);
          const B = byId.get(b);
          if (!A || !B) return null;
          return <line key={`${a}-${b}`} x1={A.xy[0]} y1={A.xy[1]} x2={B.xy[0]} y2={B.xy[1]} stroke={TONES.dim} strokeWidth="1" />;
        })}
        {nodes.map((n) => {
          const r = 6 * (n.size ?? 1) * n.xy[2];
          const color = TONES[n.tone ?? "cyan"];
          return (
            <g key={n.id}>
              <circle cx={n.xy[0]} cy={n.xy[1]} r={r * 2.4} fill={color} opacity="0.12" />
              <circle cx={n.xy[0]} cy={n.xy[1]} r={r} fill={color} />
              <text x={n.xy[0] + r + 6} y={n.xy[1] + 4} className="chapter-art-label">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function hexPoints(cx: number, cy: number, r: number, rotDeg = 0) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((60 * i + rotDeg) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}
