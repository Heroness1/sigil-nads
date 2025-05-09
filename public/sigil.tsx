import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Fungsi untuk generate sigil, sama seperti sebelumnya
const generateSigil = (text: string) => {
  const hash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const radius = 50 + (hash % 50);
  const color1 = `hsl(${(hash % 360)}, 80%, 60%)`;  // Magick color
  const color2 = `hsl(${(hash + 180) % 360}, 80%, 50%)`; // Mystical contrast color
  
  return `
    <svg width="250" height="250" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="125" cy="125" r="${radius}" fill="url(#grad1)" />
      <circle cx="125" cy="125" r="${radius + 30}" fill="none" stroke="${color1}" stroke-width="4" />
      <circle cx="125" cy="125" r="${radius + 60}" fill="none" stroke="${color2}" stroke-width="4" />
      <line x1="125" y1="125" x2="125" y2="45" stroke="${color1}" stroke-width="3" />
      <line x1="125" y1="125" x2="45" y2="45" stroke="${color2}" stroke-width="3" />
      <line x1="125" y1="125" x2="205" y2="45" stroke="${color1}" stroke-width="3" />
      <line x1="125" y1="125" x2="205" y2="205" stroke="${color2}" stroke-width="3" />
      <line x1="125" y1="125" x2="45" y2="205" stroke="${color1}" stroke-width="3" />
      <path d="M 125 40 C 145 70, 155 110, 125 140 C 95 110, 105 70, 125 40 Z" fill="none" stroke="${color1}" stroke-width="3" />
      <text x="125" y="230" font-size="14" text-anchor="middle" fill="#fff" font-family="serif">
        ${text.slice(0, 10)}
      </text>
    </svg>
  `;
};

const SigilPage = () => {
  const router = useRouter();
  const { text } = router.query;
  
  const [showSigil, setShowSigil] = useState(false);

  if (!text) return <div>Loading...</div>;

  const sigilSVG = generateSigil(text as string);

  useEffect(() => {
    // Menunggu sedikit sebelum menampilkan sigil dengan efek animasi
    setTimeout(() => {
      setShowSigil(true);
    }, 500); // Waktu delay sebelum sigil muncul
  }, [text]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Your Sigil</h1>
      <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto' }}>
        <div
          className={`sigil-container ${showSigil ? 'show' : 'hide'}`}
          dangerouslySetInnerHTML={{ __html: sigilSVG }}
        />
      </div>
      <br />
      <button onClick={() => router.push('/')} style={{ padding: '10px', fontSize: '16px' }}>
        Back to Home
      </button>
      <style jsx>{`
        .sigil-container {
          opacity: 0;
          animation: revealSigil 1s forwards;
        }
        .show {
          opacity: 1;
        }
        .hide {
          opacity: 0;
        }

        @keyframes revealSigil {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SigilPage;
