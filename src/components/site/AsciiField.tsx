import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const RAMP = " .:;+=xX$";

type AsciiFieldProps = {
  className?: string;
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
  ctx.font = `${Math.floor(cell.h * 0.72)}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  const cols = Math.ceil(width / cell.w);
  const rows = Math.ceil(height / cell.h);

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const nx = x / cols;
      const ny = y / rows;
      const wave =
        Math.sin(nx * 6.2 + time * 0.35) * 0.34 +
        Math.cos(ny * 7.8 - time * 0.24) * 0.28 +
        Math.sin((nx + ny) * 4.6 + time * 0.14) * 0.18;
      const ridge = Math.sin((nx * 2.4 + ny * 1.1) * Math.PI + time * 0.05);
      let value = 0.22 + (wave + ridge * 0.28 + 1) / 3.2;

      if (pointer.active) {
        const dx = (x + 0.5) * cell.w - pointer.x;
        const dy = (y + 0.5) * cell.h - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const well = Math.exp(-(dist * dist) / 34000);
        value = Math.min(1, value + well * 0.55);
      }

      const index = Math.min(RAMP.length - 1, Math.max(0, Math.floor(value * (RAMP.length - 1))));
      const glyph = RAMP[index] === " " ? "." : RAMP[index];
      const alpha = 0.07 + value * 0.16;
      ctx.fillStyle = `rgba(196, 214, 120, ${alpha.toFixed(3)})`;
      ctx.fillText(glyph, x * cell.w, y * cell.h);
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
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    const pointer = { x: 0, y: 0, active: false };
    let frame = 0;
    let running = true;
    const cell = { w: 14, h: 22 };

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
      cell.w = width < 640 ? 16 : 14;
      cell.h = width < 640 ? 26 : 22;
    };

    resize();

    const draw = (time: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      paint(ctx, parent.clientWidth, parent.clientHeight, time, pointer, cell);
    };

    if (reduced) {
      draw(1.7);
      const onResize = () => {
        resize();
        draw(1.7);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const tick = (stamp: number) => {
      if (!running) return;
      draw(stamp / 1000);
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
      aria-label="Field of dim characters filling the background behind the headline."
    />
  );
};

export default AsciiField;
