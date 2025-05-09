"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SigilPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200); // delay animasi
    return () => clearTimeout(timer);
  }, []);

  const svg = `
    <svg viewBox="0 0 100 100" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#000"/>
      <path d="M10 90 L50 10 L90 90 Z" stroke="#fff" stroke-width="3" fill="none"/>
    </svg>
  `;

  return (
    <main className="container">
      <h1>Your Sigil</h1>
      <div
        className={`sigil ${show ? "visible" : ""}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <button onClick={() => router.push("/")}>Back to Home</button>
    </main>
  );
}
