import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const RAMP = " .'`^\"~:;-+?*#%@";
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

type AsciiFieldProps = {
  className?: string;
};

const sample = (
  nx: number,
  ny: number,
  aspect: number,
  time: number,
  pointer: { x: number; y: number; active: boolean },
  mobile: boolean,
) => {
  const cx = mobile ? 0.52 : 0.58;
  const cy = mobile ? 0.36 : 0.48;
  const x = (nx - cx) * aspect;
  const y = ny - cy;
  const spin = time * 0.16;
  const lx = 0.42 + Math.cos(spin * 0.7) * 0.22 + (pointer.active ? (pointer.x - 0.5) * 0.55 : 0);
  const ly = -0.38 + Math.sin(spin * 0.5) * 0.1 + (pointer.active ? (pointer.y - 0.5) * 0.4 : 0);
  const lz = 0.82;
  const llen = Math.hypot(lx, ly, lz) || 1;

  const n1 = Math.sin(nx * 18.1 + ny * 7.3 + time * 0.11);
  const n2 = Math.sin(nx * 41.7 - ny * 13.9 + 1.7);
  const n3 = Math.sin((nx + ny) * 29.2 - time * 0.07);
  let v = 0.16 + n1 * 0.07 + n2 * 0.05 + n3 * 0.04;

  const sr = mobile ? 0.42 : 0.5;
  const d = Math.hypot(x, y);
  if (d < sr) {
    const z = Math.sqrt(Math.max(0, sr * sr - d * d));
    const diff = Math.max(0, (x * lx + y * ly + z * lz) / llen);
    const rim = Math.pow(1 - d / sr, 0.35);
    v = Math.max(v, 0.36 + diff * 0.7 + rim * 0.06);
  }

  const rx = x * 1.02;
  const ry = y * 2.2;
  const ring = Math.abs(Math.hypot(rx, ry) - 0.62);
  if (ring < 0.05 && Math.abs(y) < 0.24) {
    const along = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(x * 16 + time * 1.2));
    v = Math.max(v, along);
  }

  if (pointer.active) {
    const pdx = (nx - pointer.x) * aspect;
    const pdy = ny - pointer.y;
    v = Math.min(1, v + Math.exp(-(pdx * pdx + pdy * pdy) / 0.05) * 0.42);
  }
  return Math.min(1, Math.max(0, v));
};

const paint = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number; active: boolean },
  cell: { w: number; h: number },
) => {
  ctx.clearRect(0, 0, width, height);
  const fontSize = Math.floor(cell.h * 0.86);
  ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  const cols = Math.ceil(width / cell.w);
  const rows = Math.ceil(height / cell.h);
  const aspect = width / Math.max(1, height);
  const mobile = width < 640;
  const pn = {
    x: pointer.x / Math.max(1, width),
    y: pointer.y / Math.max(1, height),
    active: pointer.active,
  };

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nx = (col + 0.5) / cols;
      const ny = (row + 0.5) / rows;
      const raw = sample(nx, ny, aspect, time, pn, mobile);
      const dither = (BAYER[row % 4][col % 4] + 0.5) / 16 - 0.5;
      const value = Math.min(1, Math.max(0, Math.pow(raw, 0.82) + dither * 0.22));
      const index = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)));
      const glyph = RAMP[index];
      if (glyph === " ") continue;
      const t = nx;
      const r = Math.round(78 + t * 130);
      const g = Math.round(132 + t * 28);
      const b = Math.round(208 - t * 112);
      const alpha = 0.4 + value * 0.5;
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
      ctx.fillText(glyph, col * cell.w, row * cell.h);
    }
  }
};

const AsciiField = ({ className }: AsciiFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d", { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    const pointer = { x: 0, y: 0, active: false };
    let frame = 0;
    let running = true;
    let last = 0;
    const cell = { w: 7, h: 11 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cell.w = width < 640 ? 8 : 7;
      cell.h = width < 640 ? 13 : 11;
    };

    resize();

    const draw = (time: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      paint(ctx, parent.clientWidth, parent.clientHeight, time, pointer, cell);
    };

    if (reduced) {
      draw(2.4);
      const onResize = () => {
        resize();
        draw(2.4);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const tick = (stamp: number) => {
      if (!running) return;
      if (document.hidden) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      if (stamp - last >= 16) {
        draw(stamp / 1000);
        last = stamp;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const host = canvas.closest(".masthead-band") ?? canvas.parentElement;
    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Animated ASCII rendering of a lit sphere and ring filling the background."
    />
  );
};

export default AsciiField;
