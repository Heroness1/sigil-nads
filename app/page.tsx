'use client';

import { useState } from 'react';

export default function Home() {
  const [intention, setIntention] = useState('');
  const [sigil, setSigil] = useState('');

  // Function to generate sigil
  const generateSigil = (text: string) => {
    // Example: Generate sigil from the hash of the input text
    const hash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const radius = 40 + (hash % 30);
    const color = `hsl(${hash % 360}, 70%, 60%)`;

    return `
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="${radius}" fill="${color}" />
        <text x="60" y="115" font-size="10" text-anchor="middle" fill="#444">${text.slice(0, 10)}</text>
      </svg>
    `;
  };

  // Handle sigil generation on button click
  const handleGenerate = () => {
    if (intention.trim() !== '') {
      const svg = generateSigil(intention);
      setSigil(svg);
    } else {
      setSigil('');
      alert('Please enter your intention!');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Sigil of the Day</h1>
      
      {/* Input field for intention */}
      <input
        type="text"
        placeholder="Write your intention for today..."
        className="px-4 py-2 rounded bg-neutral-800 text-white w-full max-w-sm mb-4"
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
      />

      {/* Button to generate sigil */}
      <button
        onClick={handleGenerate}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded mb-6"
      >
        Generate Sigil
      </button>

      {/* Displaying the generated sigil */}
      {sigil && (
        <div
          className="border border-white/20 rounded p-4 bg-white/10"
          dangerouslySetInnerHTML={{ __html: sigil }}
        />
      )}
    </main>
  );
}
