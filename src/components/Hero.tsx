import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import ScamStorm, { STORM_DURATION_MS } from "./ScamStorm";

const TITLE = "تفادى";
const LETTERS = [
  { ch: "ت", glow: "#7be4ff" },
  { ch: "ف", glow: "#3ed3ff" },
  { ch: "ا", glow: "#ffffff" },
  { ch: "د", glow: "#22b8ec" },
  { ch: "ى", glow: "#39f0a0" },
];

export default function Hero() {
  const [stormDone, setStormDone] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStormDone(true);
      return;
    }
    const glitchT = window.setTimeout(() => setGlitch(true), STORM_DURATION_MS - 350);
    const doneT = window.setTimeout(() => setStormDone(true), STORM_DURATION_MS);
    const glitchOff = window.setTimeout(() => setGlitch(false), STORM_DURATION_MS + 500);
    return () => {
      clearTimeout(glitchT);
      clearTimeout(doneT);
      clearTimeout(glitchOff);
    };
  }, [reduced]);

  const handleSkip = useCallback(() => {
    setGlitch(true);
    window.setTimeout(() => setStormDone(true), 260);
    window.setTimeout(() => setGlitch(false), 650);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-12 pt-28 sm:px-8"
    >
      {!stormDone && <ScamStorm done={false} onSkip={handleSkip} />}

      {glitch && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
            className="pointer-events-none absolute inset-0 z-40 mix-blend-screen"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(123,228,255,0.20) 0px, rgba(123,228,255,0.20) 1px, transparent 1px, transparent 4px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-40"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(255,59,107,0.14) 50%, transparent 60%)",
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stormDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: stormDone ? 0.1 : 0 }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: stormDone ? 1 : 0, y: stormDone ? 0 : 14 }}
          transition={{ duration: 0.7, delay: stormDone ? 0.1 : 0 }}
          className="mb-7 flex justify-center"
        >
          <span className="label-eyebrow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-safe" />
            تجربة تفاعلية للنجاة الرقمية
          </span>
        </motion.div>

        <h1
          aria-label={TITLE}
          className="hero-word relative mx-auto select-none text-[24vw] font-black leading-none sm:text-[15vw] md:text-[174px] lg:text-[214px]"
        >
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden className="inline-flex items-end justify-center">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter.ch}
                initial={{ opacity: 0, y: 60, filter: "blur(20px)", scale: 1.12 }}
                animate={{
                  opacity: stormDone ? 1 : 0,
                  y: stormDone ? 0 : 60,
                  filter: stormDone ? "blur(0px)" : "blur(20px)",
                  scale: stormDone ? 1 : 1.12,
                }}
                transition={{
                  duration: 1.05,
                  delay: stormDone ? 0.2 + i * 0.11 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ textShadow: `0 0 40px ${letter.glow}66, 0 0 100px ${letter.glow}33` }}
              >
                {letter.ch}
              </motion.span>
            ))}
          </span>

          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: stormDone ? 1 : 0, opacity: stormDone ? 1 : 0 }}
            transition={{ duration: 1.2, delay: stormDone ? 1.05 : 0, ease: "easeOut" }}
            className="absolute -bottom-2 left-1/2 block h-[3px] w-[44%] -translate-x-1/2 origin-center rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #7be4ff, #ffffff, #39f0a0, transparent)",
              boxShadow: "0 0 22px rgba(123,228,255,0.85)",
            }}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: stormDone ? 1 : 0, y: stormDone ? 0 : 12 }}
          transition={{ duration: 0.8, delay: stormDone ? 1.2 : 0 }}
          className="mx-auto mt-9 max-w-3xl text-balance text-xl font-bold leading-relaxed text-white/90 sm:text-2xl md:text-3xl"
        >
          لأن ضغطة واحدة قد تغيّر كل شيء.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stormDone ? 1 : 0, y: stormDone ? 0 : 10 }}
          transition={{ duration: 0.8, delay: stormDone ? 1.4 : 0 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/62 sm:text-base"
        >
          تعلّم كيف تتفادى الروابط الخادعة، سرقة كلمات المرور، ورسائل الاحتيال قبل أن تتحول إلى مشكلة حقيقية.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: stormDone ? 1 : 0, y: stormDone ? 0 : 14 }}
          transition={{ duration: 0.9, delay: stormDone ? 1.6 : 0 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="#book" className="btn-primary">
            <span>ابدأ الرحلة</span>
            <Arrow />
          </a>
          <a href="#test" className="btn-ghost">
            <span>اختبر نفسك</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: stormDone ? 1 : 0, y: stormDone ? 0 : 8 }}
          transition={{ duration: 0.8, delay: stormDone ? 1.85 : 0 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 text-[11px] text-white/52 sm:grid-cols-3 sm:text-xs"
        >
          {["محتوى عربي واضح", "خطوات قابلة للتطبيق", "للمبتدئين والمحترفين"].map((item, i) => (
            <div key={item} className="glass flex items-center justify-center gap-2 rounded-2xl px-4 py-3">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i === 0 ? "bg-signal-safe" : i === 1 ? "bg-cyber-300" : "bg-signal-warn"
                }`}
              />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="rotate-180">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
