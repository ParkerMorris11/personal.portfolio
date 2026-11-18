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

const coverUV = (
  nx: number,
  ny: number,
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number,
) => {
  const zoom = canvasW < 640 ? 1.68 : 1.38;
  const scale = Math.max(canvasW / imgW, canvasH / imgH) * zoom;
  const dw = imgW * scale;
  const dh = imgH * scale;
  const ox = (canvasW - dw) * (canvasW < 640 ? 0.55 : 0.5);
  const oy = (canvasH - dh) * (canvasW < 640 ? 0.7 : 0.8);
  return [(nx * canvasW - ox) / dw, (ny * canvasH - oy) / dh];
};

const samplePixel = (data: Uint8ClampedArray, width: number, height: number, u: number, v: number) => {
  if (u < 0 || v < 0 || u > 1 || v > 1) return { luma: 0.55, r: 170, g: 168, b: 196 };
  const x = Math.min(width - 1, Math.max(0, u * (width - 1)));
  const y = Math.min(height - 1, Math.max(0, v * (height - 1)));
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

const textClear = (nx: number, ny: number, width: number) => {
  if (width < 640) {
    const band = Math.max(0, Math.min(1, (ny - 0.4) / 0.28));
    return band * Math.max(0, 1 - nx * 0.35);
  }
  const xFade = Math.max(0, Math.min(1, (0.42 - nx) / 0.32));
  const yFade = Math.max(0, Math.min(1, (ny - 0.52) / 0.22));
  return xFade * yFade;
};

const paint = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number; active: boolean },
  cell: { w: number; h: number },
  source: { data: Uint8ClampedArray; width: number; height: number } | null,
) => {
  ctx.clearRect(0, 0, width, height);
  const fontSize = Math.floor(cell.h * 0.88);
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

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nx = (col + 0.5) / cols;
      const ny = (row + 0.5) / rows;
      const warpX = Math.sin(ny * 3.6 + time * 0.18) * 0.002;
      const warpY = Math.cos(nx * 2.8 - time * 0.14) * 0.0016;
      const u = nx + warpX;
      const v = ny + warpY;
      let luma = 0.55;
      let sr = 170;
      let sg = 168;
      let sb = 196;

      if (source) {
        const uv = coverUV(u, v, width, height, source.width, source.height);
        const pixel = samplePixel(source.data, source.width, source.height, uv[0], uv[1]);
        luma = pixel.luma;
        sr = pixel.r;
        sg = pixel.g;
        sb = pixel.b;
      }

      // Sky is a mid-luma wash; snow and rock both sit away from it, so the ridge holds.
      let ink = Math.min(1, Math.abs(luma - 0.57) / 0.26);
      ink = Math.pow(ink, 0.7);

      if (pn.active) {
        const pdx = (nx - pn.x) * aspect;
        const pdy = ny - pn.y;
        ink = Math.min(1, ink + Math.exp(-(pdx * pdx + pdy * pdy) / 0.045) * 0.22);
      }

      const clear = textClear(nx, ny, width);
      ink *= 1 - clear * 0.42;

      const dither = (BAYER[row % 4][col % 4] + 0.5) / 16 - 0.5;
      const value = Math.min(1, Math.max(0, ink + dither * 0.1));
      if (value < 0.09) continue;
      const index = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)));
      const glyph = RAMP[index];

      const t = nx;
      const r = Math.round(sr * 0.22 + (62 + t * 158) * 0.78);
      const g = Math.round(sg * 0.22 + (118 + t * 38) * 0.78);
      const b = Math.round(sb * 0.22 + (216 - t * 132) * 0.78);
      const alpha = (0.34 + value * 0.66) * (1 - clear * 0.62);
      if (alpha < 0.05) continue;
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
      cell.w = width < 640 ? 6 : 5;
      cell.h = width < 640 ? 10 : 8;
    };

    resize();

    const draw = (time: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      paint(ctx, parent.clientWidth, parent.clientHeight, time, pointer, cell, source);
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
      aria-label="Wasatch ridgeline, Mount Timpanogos above Provo, rendered as a field of colored ASCII characters."
    />
  );
};

export default AsciiField;
