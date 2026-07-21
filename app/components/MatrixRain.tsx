"use client";

import { useEffect, useRef, useState } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

export function MatrixRain({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose]);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(1);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(4, 8, 6, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#46d17a";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, [active, reducedMotion]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer bg-[#040806]"
      onClick={onClose}
      role="button"
      aria-label="matrix mode overlay, press escape or click to exit"
      tabIndex={0}
    >
      {reducedMotion ? (
        <p className="flex h-full items-center justify-center text-sm text-accent">
          matrix mode (animation skipped) — press esc to exit
        </p>
      ) : (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted">
        press esc to exit
      </span>
    </div>
  );
}
