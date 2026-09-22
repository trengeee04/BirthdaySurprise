import { useCallback, useEffect, useState } from "react";

export default function HeartBurst({ x, y, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 360;
      const distance = 60 + Math.random() * 80;
      const radians = (angle * Math.PI) / 180;
      const tx = Math.cos(radians) * distance;
      const ty = Math.sin(radians) * distance - 40; // Bias upward
      const rotation = -30 + Math.random() * 60;
      const scale = 0.6 + Math.random() * 0.8;
      const hearts = ["❤️", "💗", "💖", "💕", "🩷", "✨"];

      return {
        id: i,
        emoji: hearts[i % hearts.length],
        tx,
        ty,
        rotation,
        scale,
        delay: Math.random() * 0.15,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="heart-burst"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="heart-burst-particle"
          style={{
            "--rotate": `${p.rotation}deg`,
            animationDelay: `${p.delay}s`,
            left: 0,
            top: 0,
            fontSize: `${p.scale * 1.4}rem`,
            animation: `heartRise 1.2s ease-out ${p.delay}s forwards`,
            transform: `translate(${p.tx}px, ${p.ty}px)`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
