import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Background() {
  const stars = useMemo(
    () =>
      Array.from({ length: 52 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 0.7 + Math.random() * 1.4,
        d: 2.5 + Math.random() * 5,
        delay: Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(14,143,192,0.20), transparent 58%), linear-gradient(180deg, #04060c 0%, #050712 48%, #04060c 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,228,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(123,228,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(180deg, transparent, black 12%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 12%, black 82%, transparent)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(123,228,255,0.3) 0px, rgba(123,228,255,0.3) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <motion.div
        className="absolute left-[-20%] top-[18%] h-px w-[140%] bg-gradient-to-l from-transparent via-cyber-200/35 to-transparent"
        animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-20%] top-[62%] h-px w-[140%] bg-gradient-to-l from-transparent via-signal-safe/25 to-transparent"
        animate={{ x: ["7%", "-7%", "7%"], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              boxShadow: `0 0 ${s.s * 4}px rgba(123,228,255,0.55)`,
            }}
            animate={{ opacity: [0.12, 0.82, 0.12] }}
            transition={{ duration: s.d, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
