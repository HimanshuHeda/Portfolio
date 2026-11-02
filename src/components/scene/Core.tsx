"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TONES } from "./spec";
import { blend } from "./blend";

// Scene objects live at module scope: the core renders once, and three.js
// objects are mutated every frame (outside React's state model).
const outerGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 1));
const innerGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.55, 0));
const outerMat = new THREE.LineBasicMaterial({ color: TONES.cyan, transparent: true, depthWrite: false });
const innerMat = new THREE.LineBasicMaterial({ color: TONES.violet, transparent: true, depthWrite: false });

function setCoreOpacity(opacity: number) {
  outerMat.opacity = opacity;
  innerMat.opacity = opacity * 0.8;
}

// Wireframe core: an outer cyan icosahedron and an inner violet one turning
// the other way. Scale and opacity follow the chapter spec.
export default function Core() {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.LineSegments>(null);

  useFrame((_, dt) => {
    const { core } = blend();
    const g = group.current;
    if (!g || !outer.current || !inner.current) return;
    const k = 1 - Math.exp(-dt * 5);
    const s = THREE.MathUtils.lerp(g.scale.x, Math.max(core.scale, 0.0001), k);
    g.scale.setScalar(s);
    setCoreOpacity(THREE.MathUtils.lerp(outerMat.opacity, core.opacity, k));
    outer.current.rotation.y += dt * 0.12;
    outer.current.rotation.x += dt * 0.04;
    inner.current.rotation.y -= dt * 0.25;
    g.visible = s > 0.01 && outerMat.opacity > 0.01;
  });

  return (
    <group ref={group}>
      <lineSegments ref={outer} geometry={outerGeo} material={outerMat} />
      <lineSegments ref={inner} geometry={innerGeo} material={innerMat} />
    </group>
  );
}
