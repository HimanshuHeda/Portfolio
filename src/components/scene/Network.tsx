"use client";

import { useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { allNodes } from "./spec";
import { allEdges, blend } from "./blend";

const NODE_RADIUS = 0.085;
const HIDDEN = 0.0001;
const COUNT = allNodes.length;

// three.js objects live at module scope: the network renders once and these
// are mutated every frame, outside React's state model.
const nodeGeo = new THREE.IcosahedronGeometry(NODE_RADIUS, 1);
const nodeMat = new THREE.MeshBasicMaterial({ toneMapped: false });
// Invisible, larger hit area for hover labels.
const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false });

// Soft glow per node: one Points draw call with a radial falloff shader.
const GLOW = 9; // glow diameter in node radii
const glowGeo = new THREE.BufferGeometry();
glowGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
glowGeo.setAttribute("aColor", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
glowGeo.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(COUNT), 1));
const glowMat = new THREE.ShaderMaterial({
  uniforms: { uScale: { value: 400 } },
  vertexShader: /* glsl */ `
    attribute vec3 aColor;
    attribute float aSize;
    uniform float uScale;
    varying vec3 vColor;
    void main() {
      vColor = aColor;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * uScale / -mv.z;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.0, d);
      // The canvas is transparent over the page, so write real alpha
      // (additive blend multiplies rgb by it) instead of opaque black.
      gl_FragColor = vec4(vColor, a * a * 0.55);
    }`,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const edgeGeo = new THREE.BufferGeometry();
edgeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(Math.max(allEdges.length, 1) * 6), 3));
// RGBA colours: a 4-component colour attribute gives per-vertex alpha, so
// edges fade properly over the transparent canvas.
edgeGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(Math.max(allEdges.length, 1) * 8), 4));
const edgeMat = new THREE.LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  depthWrite: false,
});

const m = new THREE.Matrix4();
const q = new THREE.Quaternion();
const sc = new THREE.Vector3();

function updateInstances(nodes: THREE.InstancedMesh, hits: THREE.InstancedMesh, hovered: number | null, pxScale: number) {
  const st = blend();
  const gPos = glowGeo.attributes.position as THREE.BufferAttribute;
  const gCol = glowGeo.attributes.aColor as THREE.BufferAttribute;
  const gSize = glowGeo.attributes.aSize as THREE.BufferAttribute;
  for (let i = 0; i < COUNT; i++) {
    const s = st.nodes[i];
    const size = Math.max(s.size * (hovered === i ? 1.6 : 1), HIDDEN);
    nodes.setMatrixAt(i, m.compose(s.pos, q, sc.setScalar(size)));
    hits.setMatrixAt(i, m.compose(s.pos, q, sc.setScalar(size * 3.2)));
    nodes.setColorAt(i, s.color);
    gPos.setXYZ(i, s.pos.x, s.pos.y, s.pos.z);
    gCol.setXYZ(i, s.color.r, s.color.g, s.color.b);
    gSize.setX(i, size * NODE_RADIUS * GLOW);
  }
  nodes.instanceMatrix.needsUpdate = true;
  hits.instanceMatrix.needsUpdate = true;
  if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
  gPos.needsUpdate = true;
  gCol.needsUpdate = true;
  gSize.needsUpdate = true;
  glowMat.uniforms.uScale.value = pxScale;
}

function updateEdges() {
  if (!allEdges.length) return;
  const st = blend();
  const pos = edgeGeo.attributes.position as THREE.BufferAttribute;
  const col = edgeGeo.attributes.color as THREE.BufferAttribute;
  allEdges.forEach(([a, b], e) => {
    const A = st.nodes[a];
    const B = st.nodes[b];
    const alpha = st.edges[e] * Math.min(A.size, B.size) * 0.55;
    pos.setXYZ(e * 2, A.pos.x, A.pos.y, A.pos.z);
    pos.setXYZ(e * 2 + 1, B.pos.x, B.pos.y, B.pos.z);
    col.setXYZW(e * 2, A.color.r, A.color.g, A.color.b, alpha);
    col.setXYZW(e * 2 + 1, B.color.r, B.color.g, B.color.b, alpha);
  });
  pos.needsUpdate = true;
  col.needsUpdate = true;
}

// Shared hover label: one DOM element outside the canvas.
function showTip(el: HTMLDivElement | null, text: string, x: number, y: number) {
  if (!el) return;
  el.textContent = text;
  el.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
  el.dataset.visible = "true";
}

function hideTip(el: HTMLDivElement | null) {
  if (el) el.dataset.visible = "false";
}

// All system nodes as two instanced meshes (solid node + soft halo) and every
// edge as one LineSegments buffer: one draw call each, whatever the chapter.
export default function Network({ tooltipRef }: { tooltipRef: React.RefObject<HTMLDivElement | null> }) {
  const nodes = useRef<THREE.InstancedMesh>(null);
  const hits = useRef<THREE.InstancedMesh>(null);
  const height = useThree((s) => s.size.height);
  const dpr = useThree((s) => s.viewport.dpr);
  const hovered = useRef<number | null>(null);

  useFrame((state) => {
    if (!nodes.current || !hits.current) return;
    // World size -> pixels at distance 1 for the glow points.
    const fov = (state.camera as THREE.PerspectiveCamera).fov ?? 42;
    const pxScale = (height * dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)));
    updateInstances(nodes.current, hits.current, hovered.current, pxScale);
    updateEdges();
  });

  function onMove(e: ThreeEvent<PointerEvent>) {
    const id = e.instanceId;
    if (id === undefined || blend().nodes[id].size < 0.35) return onOut();
    hovered.current = id;
    showTip(tooltipRef.current, allNodes[id].label, e.nativeEvent.clientX, e.nativeEvent.clientY);
  }

  function onOut() {
    hovered.current = null;
    hideTip(tooltipRef.current);
  }

  return (
    <group>
      {allEdges.length > 0 && <lineSegments geometry={edgeGeo} material={edgeMat} frustumCulled={false} />}
      <points geometry={glowGeo} material={glowMat} frustumCulled={false} raycast={() => null} />
      {/* Hover uses a larger invisible hit area; the solid node ignores rays. */}
      <instancedMesh
        ref={hits}
        args={[nodeGeo, hitMat, COUNT]}
        frustumCulled={false}
        onPointerMove={onMove}
        onPointerOut={onOut}
      />
      <instancedMesh ref={nodes} args={[nodeGeo, nodeMat, COUNT]} frustumCulled={false} raycast={() => null} />
    </group>
  );
}
