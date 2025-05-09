// app/page.tsx "use client"; import { useRouter } from "next/navigation"; import { useState } from "react";

export default function Home() { const router = useRouter(); const [intent, setIntent] = useState("");

const handleGenerate = () => { localStorage.setItem("intent", intent); router.push("/sigil"); };

return ( <main className="container"> <h1>Sigil Generator</h1> <input type="text" value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="Enter your intention" /> <button onClick={handleGenerate}>Generate Sigil</button> </main> ); }

// app/sigil.tsx "use client"; import { useEffect, useState } from "react"; import SigilCanvas from "../components/SigilCanvas"; import { processIntent } from "../sigilUtils"; import { useRouter } from "next/navigation";

export default function SigilPage() { const [code, setCode] = useState(""); const router = useRouter();

useEffect(() => { const storedIntent = localStorage.getItem("intent") || ""; setCode(processIntent(storedIntent)); }, []);

return ( <div className="sigil-container scratch-reveal"> <SigilCanvas code={code} /> <button onClick={() => router.push("/")}>Back to Home</button> </div> ); }

// sigilUtils.ts export function processIntent(intent: string): string { const upper = intent.toUpperCase().replace(/[^A-Z]/g, ""); let result = ""; for (const char of upper) { if ("AEIOU".includes(char)) continue; if (!result.includes(char)) result += char; } return result; }

// components/SigilCanvas.tsx interface Props { code: string; }

export default function SigilCanvas({ code }: Props) { const points = code.split("").map((char, i) => { const angle = (i / code.length) * Math.PI * 2; const r = 40 + (char.charCodeAt(0) % 20); return [100 + r * Math.cos(angle), 100 + r * Math.sin(angle)]; });

const path = points.map(([x, y], i) => ${i === 0 ? "M" : "L"}${x},${y}).join(" ") + " Z";

return ( <svg width="200" height="200" className="sigil-svg"> <path d={path} stroke="black" fill="none" strokeWidth={2} /> </svg> ); }

// styles/scratch.css .scratch-reveal { animation: scratch 1s ease-out forwards; }

@keyframes scratch { 0% { filter: blur(20px) brightness(0); transform: scale(1.1); } 100% { filter: blur(0) brightness(1); transform: scale(1); } }

// next.config.js (tambahkan ini jika perlu import .css) module.exports = { experimental: { appDir: true, }, };

