"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import Core from "./Core";
import Network from "./Network";
import { blend, updateBlend } from "./blend";
import { startTracking, tracker } from "./tracker";

const MAX_DPR = 1.5;

type Props = {
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  onReady: () => void;
};

// The WebGL layer behind the story. Lazy-loaded (next/dynamic, ssr: false)
// after first paint; decorative only (the wrapper is aria-hidden).
export default function Scene({ tooltipRef, onReady }: Props) {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, MAX_DPR));
  const [active, setActive] = useState(true);

  useEffect(() => startTracking(), []);

  // Stop rendering when the tab is hidden or the story is scrolled out of view.
  useEffect(() => {
    let visible = !document.hidden;
    let onScreen = true;
    const sync = () => setActive(visible && onScreen);
    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const root = document.getElementById("story-root");
    const io = root
      ? new IntersectionObserver(([e]) => {
          onScreen = e.isIntersecting;
          sync();
        })
      : null;
    if (root && io) io.observe(root);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.2, 6] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Pointer events come from the whole story, so hover works under the text.
      eventSource={typeof document !== "undefined" ? (document.getElementById("story-root") ?? undefined) : undefined}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        requestAnimationFrame(onReady);
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Rig />
      <World tooltipRef={tooltipRef} />
    </Canvas>
  );
}

function World({ tooltipRef }: { tooltipRef: Props["tooltipRef"] }) {
  const size = useThree((s) => s.size);
  const group = useRef<THREE.Group>(null);

  // Wide screens: the scene sits right of the text column. Narrow: centred,
  // smaller, behind the text.
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const wide = size.width >= 1024;
    const k = 1 - Math.exp(-dt * 4);
    g.position.x = THREE.MathUtils.lerp(g.position.x, wide ? 1.9 : 0, k);
    g.position.y = THREE.MathUtils.lerp(g.position.y, wide ? 0 : -0.6, k);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, wide ? 1 : 0.78, k));
  });

  return (
    <group ref={group}>
      <Core />
      <Network tooltipRef={tooltipRef} />
    </group>
  );
}

const lookAt = new THREE.Vector3();

function Rig() {
  useFrame((state, dt) => {
    updateBlend(Math.min(dt, 0.1));
    const st = blend();
    const k = 1 - Math.exp(-dt * 3);
    // Subtle mouse parallax on top of the chapter camera.
    const tx = st.camera.pos.x + tracker.pointerX * 0.35;
    const ty = st.camera.pos.y + tracker.pointerY * 0.22;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, tx, k);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, ty, k);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, st.camera.pos.z, k);
    lookAt.lerp(st.camera.target, k);
    state.camera.lookAt(lookAt);
  }, -1);
  return null;
}
