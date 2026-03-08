import { useRef, useEffect, useCallback } from 'react';

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

// Bayer 8x8 matrix
const BAYER = [
  0, 48, 12, 60, 3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53,
  42, 26, 38, 22, 41, 25, 37, 21,
].map((v) => v / 64);

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Simple 2D value noise
function hash(x: number, y: number) {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
}

function noise2d(x: number, y: number) {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  const fx = x - ix,
    fy = y - iy;
  const u = fade(fx),
    v = fade(fy);
  const a = hash(ix, iy),
    b = hash(ix + 1, iy),
    c = hash(ix, iy + 1),
    d = hash(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, freq: number, amp: number) {
  let value = 0;
  let a = 1;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    value += a * Math.abs(noise2d(x * f, y * f) * 2 - 1);
    f *= freq;
    a *= amp;
  }
  return value;
}

function pattern(x: number, y: number, time: number, speed: number, freq: number, amp: number) {
  const x2 = x - time * speed;
  const y2 = y - time * speed;
  const f1 = fbm(x2, y2, freq, amp);
  return fbm(x + f1, y + f1, freq, amp);
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction: _emi = true,
  mouseRadius: _mr = 1,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const startTime = useRef(Date.now());

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const ps = Math.max(1, Math.round(pixelSize));
    const cols = Math.ceil(w / ps);
    const rows = Math.ceil(h / ps);
    const time = disableAnimation ? 0 : (Date.now() - startTime.current) / 1000;
    const aspect = w / h;
    const step = 1 / (colorNum - 1);

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Map to UV space centered at origin
        const u = (col / cols - 0.5) * aspect;
        const v = row / rows - 0.5;

        const f = pattern(u, v, time, waveSpeed, waveFrequency, waveAmplitude);

        // Dither
        const bx = col % 8;
        const by = row % 8;
        const threshold = BAYER[by * 8 + bx] - 0.25;

        let r = f * waveColor[0] + threshold * step;
        let g = f * waveColor[1] + threshold * step;
        let b = f * waveColor[2] + threshold * step;

        const bias = 0.2;
        r = Math.max(0, Math.min(1, r - bias));
        g = Math.max(0, Math.min(1, g - bias));
        b = Math.max(0, Math.min(1, b - bias));

        r = Math.round(r * (colorNum - 1) + 0.5) / (colorNum - 1);
        g = Math.round(g * (colorNum - 1) + 0.5) / (colorNum - 1);
        b = Math.round(b * (colorNum - 1) + 0.5) / (colorNum - 1);

        const pr = Math.min(255, Math.max(0, Math.round(r * 255)));
        const pg = Math.min(255, Math.max(0, Math.round(g * 255)));
        const pb = Math.min(255, Math.max(0, Math.round(b * 255)));

        // Fill pixel block
        for (let dy = 0; dy < ps && row * ps + dy < h; dy++) {
          for (let dx = 0; dx < ps && col * ps + dx < w; dx++) {
            const idx = ((row * ps + dy) * w + col * ps + dx) * 4;
            data[idx] = pr;
            data[idx + 1] = pg;
            data[idx + 2] = pb;
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    if (!disableAnimation) {
      frameRef.current = requestAnimationFrame(render);
    }
  }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      // Use lower resolution for performance
      const scale = 0.25;
      canvas.width = Math.floor(rect.width * scale);
      canvas.height = Math.floor(rect.height * scale);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    startTime.current = Date.now();
    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}
