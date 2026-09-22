import { useMemo } from "react";

const heartEmojis = ["💗", "💕", "🎂", "🌸", "✨", "💝", "🎈", "❤️", "🎉", "🌷", "🩷", "🎁", "💖", "🎀", "🩵"];

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
    }));
  }, []);

  return (
    <div aria-hidden="true">
      {hearts.map((heart) => (
        <span key={heart.id} className="floating-heart">
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
