"use client";

import { Component, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// Loads the WebGL scene after first paint, only on capable devices.
// Everyone else keeps the static SVG art that is already in the HTML.
const Scene = dynamic(() => import("@/components/scene/Scene"), { ssr: false, loading: () => null });

type Capability = "pending" | "3d" | "static";

let cached: Capability | null = null;

function detectCapability(): Capability {
  if (cached) return cached;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(nav.connection?.saveData);
  const lowEnd =
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4);
  cached = reducedMotion || saveData || lowEnd || !hasWebGL() ? "static" : "3d";
  return cached;
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

function setSceneMode(mode: "3d" | "static") {
  document.getElementById("story-root")?.setAttribute("data-scene", mode);
}

export default function SceneLoader() {
  const capability = useSyncExternalStore<Capability>(noopSubscribe, detectCapability, () => "pending");
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (capability !== "3d") return;
    // Loading on idle cost ~800 ms of blocking time on mobile (Lighthouse 77),
    // so the 3D chunk waits for the visitor's first scroll, pointer move,
    // touch or key press, then for the next idle moment. Until then the
    // static art is shown, so the page is never blank.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const events = ["scroll", "pointermove", "pointerdown", "touchstart", "keydown", "wheel"] as const;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setLoad(true), { timeout: 1500 });
      else timeoutId = window.setTimeout(() => setLoad(true), 200);
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [capability]);

  if (!load || failed) return null;

  return (
    <SceneErrorBoundary
      onError={() => {
        setSceneMode("static");
        setFailed(true);
      }}
    >
      <div className="scene-canvas" aria-hidden="true">
        <Scene tooltipRef={tooltipRef} onReady={() => setSceneMode("3d")} />
      </div>
      <div ref={tooltipRef} className="scene-tooltip" aria-hidden="true" />
    </SceneErrorBoundary>
  );
}

class SceneErrorBoundary extends Component<{ onError: () => void; children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
