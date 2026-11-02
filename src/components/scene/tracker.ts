// Scroll and pointer state shared with the render loop. Plain mutable object:
// updated by passive listeners, read every frame, never triggers React renders.

export const tracker = {
  /** 0 = chapter 0 centred, 1 = chapter 1 centred, ... (fractional between). */
  progress: 0,
  /** Pointer in -1..1, 0 = centre. */
  pointerX: 0,
  pointerY: 0,
};

type Offset = { index: number; top: number };
let offsets: Offset[] = [];

function measure() {
  offsets = [...document.querySelectorAll<HTMLElement>("[data-chapter]")]
    .map((el) => ({ index: Number(el.dataset.chapter), top: el.getBoundingClientRect().top + window.scrollY }))
    .sort((a, b) => a.index - b.index);
}

function update() {
  if (!offsets.length) return;
  const centre = window.scrollY + window.innerHeight * 0.5;
  let p = offsets[0].index;
  for (let i = 0; i < offsets.length; i++) {
    const cur = offsets[i];
    const next = offsets[i + 1];
    if (!next) {
      if (centre >= cur.top) p = cur.index;
      break;
    }
    if (centre < next.top) {
      // Hold the chapter state for most of the section, then blend to the next.
      const frac = Math.min(Math.max((centre - cur.top) / (next.top - cur.top), 0), 1);
      const t = smoothstep(0.5, 1, frac);
      p = cur.index + t * (next.index - cur.index);
      break;
    }
  }
  tracker.progress = p;
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

/** Starts listening; returns a cleanup function. */
export function startTracking() {
  const onScroll = () => update();
  const onResize = () => {
    measure();
    update();
  };
  const onPointer = (e: PointerEvent) => {
    tracker.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    tracker.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  measure();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  // Fonts and images can shift section positions after load.
  const ro = new ResizeObserver(onResize);
  ro.observe(document.body);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    ro.disconnect();
  };
}
