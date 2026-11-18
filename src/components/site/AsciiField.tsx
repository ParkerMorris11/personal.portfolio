import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const RAMP = " .'`^\"~:;-+?*#%@";
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
// Mount Timpanogos from Provo by a4gpa. Source:
// https://commons.wikimedia.org/wiki/File:Mount_Timpanogos_-_01-07-08.jpg
// License: CC BY-SA 2.0 (https://creativecommons.org/licenses/by-sa/2.0/)
const SOURCE = "/hero-ascii-source.jpg";

type AsciiFieldProps = {
  className?: string;
};

const samplePixel = (data: Uint8ClampedArray, width: number, height: number, u: number, v: number) => {
  const uu = Math.min(1, Math.max(0, u));
  const vv = Math.min(1, Math.max(0, v));
  const x = uu * (width - 1);
  const y = vv * (height - 1);
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);
  const tx = x - x0;
  const ty = y - y0;
  const at = (px: number, py: number) => {
    const i = (py * width + px) * 4;
    return [data[i], data[i + 1], data[i + 2]] as const;
  };
  const a = at(x0, y0);
  const b = at(x1, y0);
  const c = at(x0, y1);
  const d = at(x1, y1);
  const mix = (p: number, q: number, t: number) => p + (q - p) * t;
  const r = mix(mix(a[0], b[0], tx), mix(c[0], d[0], tx), ty);
  const g = mix(mix(a[1], b[1], tx), mix(c[1], d[1], tx), ty);
  const bl = mix(mix(a[2], b[2], tx), mix(c[2], d[2], tx), ty);
  const luma = (0.299 * r + 0.587 * g + 0.114 * bl) / 255;
  return { luma, r, g, b: bl };
};

const paint = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number; active: boolean },
  cell: { w: number; h: number },
  source: { data: Uint8ClampedArray; width: number; height: number } | null,
  scrollT: number,
) => {
  ctx.clearRect(0, 0, width, height);
  const fontSize = Math.floor(cell.h * 0.9);
  ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  const cols = Math.ceil(width / cell.w);
  const rows = Math.ceil(height / cell.h);
  const aspect = width / Math.max(1, height);
  const pn = {
    x: pointer.x / Math.max(1, width),
    y: pointer.y / Math.max(1, height),
    active: pointer.active,
  };
  const u0 = width < 640 ? 0.08 : 0.04;
  const u1 = width < 640 ? 0.98 : 0.99;
  const v0 = (width < 640 ? 0.32 : 0.28) + scrollT * 0.16;
  const vSpan = width < 640 ? 0.52 : 0.58;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nx = (col + 0.5) / cols;
      const ny = (row + 0.5) / rows;
      const warpX = Math.sin(ny * 3.2 + time * 0.16) * 0.0014;
      const warpY = Math.cos(nx * 2.4 - time * 0.12) * 0.001;
      const u = u0 + nx * (u1 - u0) + warpX;
      const v = v0 + ny * vSpan + warpY;
      let luma = 0.58;
      let sr = 90;
      let sg = 100;
      let sb = 140;

      if (source) {
        const pixel = samplePixel(source.data, source.width, source.height, u, v);
        luma = pixel.luma;
        sr = pixel.r;
        sg = pixel.g;
        sb = pixel.b;
      }

      const bluish = sb > sr + 10 && sb > sg;
      const mountain = luma >= 0.58 || luma <= 0.47 || (v > 0.48 && !bluish);
      let ink = mountain ? 0.9 + Math.min(0.1, Math.abs(luma - 0.68) * 0.3) : 0.18 + Math.max(0, 0.58 - luma) * 0.3;

      if (pn.active) {
        const pdx = (nx - pn.x) * aspect;
        const pdy = ny - pn.y;
        ink = Math.min(1, ink + Math.exp(-(pdx * pdx + pdy * pdy) / 0.05) * 0.16);
      }

      const dither = (BAYER[row % 4][col % 4] + 0.5) / 16 - 0.5;
      const value = Math.min(1, Math.max(0.08, ink + dither * 0.07));
      const index = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)));
      const glyph = RAMP[index];

      const t = nx;
      const r = Math.round(sr * 0.16 + (32 + t * 124) * 0.84);
      const g = Math.round(sg * 0.16 + (54 + t * 44) * 0.84);
      const b = Math.round(sb * 0.16 + (108 - t * 52) * 0.84);
      const alpha = mountain ? 0.86 + value * 0.14 : 0.28 + value * 0.22;
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
    const cell = { w: 6, h: 10 };
    let source: { data: Uint8ClampedArray; width: number; height: number } | null = null;

    const image = new Image();
    image.decoding = "async";
    image.src = SOURCE;
    image.onload = () => {
      const off = document.createElement("canvas");
      const maxW = 960;
      const scale = Math.min(1, maxW / Math.max(1, image.width));
      off.width = Math.max(1, Math.floor(image.width * scale));
      off.height = Math.max(1, Math.floor(image.height * scale));
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.drawImage(image, 0, 0, off.width, off.height);
      source = {
        data: offCtx.getImageData(0, 0, off.width, off.height).data,
        width: off.width,
        height: off.height,
      };
      draw(reduced ? 0 : last / 1000 || 1.2);
    };

    const scrollT = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(1, Math.max(0, window.scrollY / max));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cell.w = width < 640 ? 7 : 6;
      cell.h = width < 640 ? 11 : 9;
    };

    resize();

    const draw = (time: number) => {
      paint(ctx, window.innerWidth, window.innerHeight, time, pointer, cell, source, reduced ? 0 : scrollT());
    };

    if (reduced) {
      draw(0);
      const onResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", onResize);
      return () => {
        running = false;
        window.removeEventListener("resize", onResize);
      };
    }

    const tick = (stamp: number) => {
      if (!running) return;
      if (document.hidden) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      if (stamp - last >= 33) {
        draw(stamp / 1000);
        last = stamp;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Wasatch ridgeline, Mount Timpanogos above Provo, rendered as a field of colored ASCII characters."
    />
  );
};

export default AsciiField;
