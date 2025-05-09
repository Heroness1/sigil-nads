"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SigilPage() {
  const canvasRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const seed = searchParams.get("seed") || "default";
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = mulberry32(seed.hashCode());

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "#fff";
    ctx.lineWidth = 2;

    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const x = rand() * w;
      const y = rand() * h;
      const r = rand() * 40 + 20;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [searchParams]);

  return (
    <div className="container">
      <h2>Your Sigil</h2>
      <canvas ref={canvasRef} width={256} height={256}></canvas>
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
