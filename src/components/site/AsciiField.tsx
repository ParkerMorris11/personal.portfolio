import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const RAMP = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const SCRAMBLE = "@#%MW&8?*+=:;~Il";
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
// Parthenon, east side, Acropolis of Athens by Jebulon. Source:
// https://commons.wikimedia.org/wiki/File:Parthenon_east_side_Acropolis_Athens,_Greece.jpg
// License: CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/)
const SOURCE = "/hero-ascii-source.jpg";

type AsciiFieldProps = {
  className?: string;
};

const samplePixel = (data: Uint8ClampedArray, width: number, height: number, u: number, v: number) => {
  const uu = Math.min(1, Math.max(0, u));
  const vv = Math.min(1, Math.max(0, v));
  const x = Math.round(uu * (width - 1));
  const y = Math.round(vv * (height - 1));
  const i = (y * width + x) * 4;
  const r = data[i];
  const g = data[i + 1];
  const bl = data[i + 2];
  const luma = (0.299 * r + 0.587 * g + 0.114 * bl) / 255;
  return { luma, r, g, b: bl };
};

const hash21 = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
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
  reduced: boolean,
) => {
  ctx.clearRect(0, 0, width, height);
  const fontSize = Math.floor(cell.h * 0.98);
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
  const u0 = width < 640 ? 0.02 : 0.0;
  const u1 = 1;
  const v0 = scrollT * 0.08;
  const vSpan = width < 640 ? 0.86 : 0.82;
  const reveal = reduced ? 1 : Math.min(1, time / 1.2);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nx = (col + 0.5) / cols;
      const ny = (row + 0.5) / rows;
      const n = hash21(col + 0.3, row + 1.7);
      const drift = reduced ? 0 : 1;
      const warpX = Math.sin(ny * 2.8 + time * 0.22) * 0.0009 * drift;
      const warpY = Math.cos(nx * 2.1 - time * 0.16) * 0.0007 * drift;
      const shimmer = reduced ? 0 : Math.sin(time * 2.4 + col * 0.17 + row * 0.11) * 0.045;
      const u = u0 + nx * (u1 - u0) + warpX;
      const v = v0 + ny * vSpan + warpY;
      let luma = 0.5;
      let sr = 90;
      let sg = 100;
      let sb = 140;
      let edge = 0;

      if (source) {
        const pixel = samplePixel(source.data, source.width, source.height, u, v);
        luma = pixel.luma;
        sr = pixel.r;
        sg = pixel.g;
        sb = pixel.b;
        const left = samplePixel(source.data, source.width, source.height, u - 0.006, v).luma;
        const right = samplePixel(source.data, source.width, source.height, u + 0.006, v).luma;
        edge = Math.abs(left - right);
      }

      const sky = sb > sr + 10 && sb > sg + 2 && luma < 0.58;
      const temple = !sky;
      let ink = temple
        ? 0.64 + (1 - luma) * 0.34 + edge * 0.55
        : 0.18 + n * 0.16 + Math.abs(shimmer) * 0.1;

      const vx = (nx - 0.5) * 1.15;
      const vy = (ny - 0.42) * 1.05;
      const vignette = Math.min(1, vx * vx + vy * vy);
      ink *= 1 - vignette * 0.22;
      ink += shimmer * (temple ? 0.7 : 0.35);

      let scrambleNear = false;
      if (pn.active) {
        const pdx = (nx - pn.x) * aspect;
        const pdy = ny - pn.y;
        const dist2 = pdx * pdx + pdy * pdy;
        ink = Math.min(1, ink + Math.exp(-dist2 / 0.016) * 0.62);
        scrambleNear = dist2 < 0.014;
      }

      const dither = (BAYER[row % 4][col % 4] + 0.5) / 16 - 0.5;
      const value = Math.min(1, Math.max(0.05, ink + dither * 0.08));
      let index = Math.min(RAMP.length - 1, Math.floor(value * (RAMP.length - 1)));
      if (!reduced) {
        index = Math.min(RAMP.length - 1, Math.max(0, index + Math.round(shimmer * 8)));
      }
      let glyph = RAMP[index];
      if (temple && edge > 0.16 && value > 0.45) {
        glyph = "|I!Htl"[col % 6];
      }

      const assembleGate = n * 0.72 + ny * 0.18;
      if (assembleGate > reveal) {
        glyph = SCRAMBLE[Math.floor((n * 17 + time * 11) % SCRAMBLE.length)];
      } else if (scrambleNear) {
        glyph = SCRAMBLE[(col + row + Math.floor(time * 22)) % SCRAMBLE.length];
      }

      const t = nx;
      const r = Math.round(sr * 0.08 + (22 + t * 158) * 0.92);
      const g = Math.round(sg * 0.08 + (46 + t * 48) * 0.92);
      const b = Math.round(sb * 0.08 + (126 - t * 72) * 0.92);
      const alpha = temple
        ? 0.88 + value * 0.12 - vignette * 0.1
        : 0.32 + value * 0.28 - vignette * 0.08;
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.08, alpha).toFixed(3)})`;
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
    let born = 0;
    const cell = { w: 5, h: 8 };
    let source: { data: Uint8ClampedArray; width: number; height: number } | null = null;

    const image = new Image();
    image.decoding = "async";
    image.src = SOURCE;
    image.onload = () => {
      const off = document.createElement("canvas");
      const maxW = 1400;
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
      draw(reduced ? 0 : 1.4);
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
      cell.w = width < 640 ? 6 : 4;
      cell.h = width < 640 ? 10 : 7;
    };

    resize();

    const draw = (time: number) => {
      paint(
        ctx,
        window.innerWidth,
        window.innerHeight,
        time,
        pointer,
        cell,
        source,
        reduced ? 0 : scrollT(),
        reduced,
      );
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
      if (!born) born = stamp;
      if (document.hidden) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      if (stamp - last >= 33) {
        draw((stamp - born) / 1000);
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
      aria-label="The Parthenon on the Acropolis of Athens, rendered as a field of colored ASCII characters."
    />
  );
};

export default AsciiField;
