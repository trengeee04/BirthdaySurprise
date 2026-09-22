import { useEffect, useCallback } from "react";

export default function SparkleTrail() {
  const createSparkle = useCallback((x, y) => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle-particle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // Random offset
    const offsetX = -8 + Math.random() * 16;
    const offsetY = -8 + Math.random() * 16;
    sparkle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Random pastel color
    const colors = [
      "var(--pink-400)",
      "var(--pink-300)",
      "var(--blush)",
      "var(--lavender)",
      "var(--peach)",
    ];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }, []);

  useEffect(() => {
    // Skip on mobile (no cursor)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime = 0;
    const throttleMs = 120;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      // Only 30% chance to show sparkle (subtle)
      if (Math.random() > 0.3) return;

      createSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createSparkle]);

  return null;
}
