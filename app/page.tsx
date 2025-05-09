"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [intent, setIntent] = useState("");

  const handleGenerate = () => {
    localStorage.setItem("intent", intent);
    router.push("/sigil");
  };

  return (
    <main className="container">
      <h1>Sigil Generator</h1>
      <input
        type="text"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        placeholder="Enter your intention"
      />
      <button onClick={handleGenerate}>Generate Sigil</button>
    </main>
  );
}
