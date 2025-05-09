type Props = { code: string };

export default function SigilCanvas({ code }: Props) {
  const points = code.split("").map((char, i) => {
    const angle = (i / code.length) * Math.PI * 2;
    const r = 50 + (char.charCodeAt(0) % 30);
    return [100 + r * Math.cos(angle), 100 + r * Math.sin(angle)];
  });

  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z";

  return (
    <svg width="200" height="200" className="sigil-svg">
      <path d={path} stroke="black" fill="none" strokeWidth={2} />
    </svg>
  );
}
