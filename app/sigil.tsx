"use client";
import { useEffect, useState } from "react";
import SigilCanvas from "../components/SigilCanvas";
import { processIntent } from "../sigilUtils";
import { useRouter } from "next/navigation";

export default function SigilPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedIntent = localStorage.getItem("intent") || "";
    setCode(processIntent(storedIntent));
  }, []);

  return (
    <div className="sigil-container scratch-reveal">
      <SigilCanvas code={code} />
      <button onClick={() => router.push("/")}>Back to Home</button>
    </div>
  );
}
