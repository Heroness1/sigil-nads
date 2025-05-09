"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SigilPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coverRef = useRef<HTMLCanvasElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const seed = searchParams.get("seed") || "default";
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = mulberry32(seed.hashCode());
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;

    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      const x = rand() * w;
      const y = rand() * h;
      const r = rand() * 40 + 10;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [searchParams]);

  useEffect(() => {
    const canvas = coverRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    const handleMouseDown = () => setIsDrawing(true);
    const handleMouseUp = () => setIsDrawing(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDrawing]);

  return (
    <div className="sigil-container">
      <h2 className="title">Reveal Your Sigil</h2>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width={256} height={256} className="sigil-canvas" />
        <canvas ref={coverRef} width={256} height={256} className="cover-canvas" />
      </div>
      <button onClick={() => router.push("/")}>Back to Home</button>
    </div>
  );
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

declare global {
  interface String {
    hashCode(): number;
  }
}

String.prototype.hashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};
