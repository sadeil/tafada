import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FinalCTA() {
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) setRevealed(true);
  }, [reduced]);

  return (
    <section id="start" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          onViewportEnter={() => window.setTimeout(() => setRevealed(true), 550)}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto order-2 lg:order-1"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[240px] w-[170px] sm:h-[286px] sm:w-[204px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="book-cover absolute inset-0 rounded-[8px]" style={{ transform: "translateZ(-4px)", boxShadow: "0 24px 70px rgba(0,0,0,0.55)" }} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute inset-0 grid place-items-center rounded-[8px] bg-ink-800"
              style={{ boxShadow: "inset 0 0 40px rgba(123,228,255,0.18)", transform: "translateZ(-2px)" }}
            >
              <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none">
                <path d="M32 4 L56 14 V32 C56 46 44 56 32 60 C20 56 8 46 8 32 V14 Z" fill="#39f0a0" />
                <path d="M22 32 L29 39 L43 25" stroke="#04060c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: revealed ? -150 : 0 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="book-cover absolute inset-0 origin-right overflow-hidden rounded-[8px]"
              style={{ transformStyle: "preserve-3d", boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(123,228,255,0.20)" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(123,228,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(123,228,255,0.10)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center p-4">
                <svg viewBox="0 0 64 64" className="mb-3 h-10 w-10" fill="none">
                  <path d="M32 4 L56 14 V32 C56 46 44 56 32 60 C20 56 8 46 8 32 V14 Z" fill="#7be4ff" />
                  <path d="M22 32 L29 39 L43 25" stroke="#04060c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="hero-word text-4xl font-black">تفادى</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="order-1 text-center lg:order-2 lg:text-right">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal-safe" />
            ابدأ بعادة واحدة
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-5 text-3xl font-black leading-snug text-white sm:text-4xl md:text-5xl"
          >
            المعرفة لا تمنع الخطر،
            <br />
            <span className="text-glow text-cyber-200">لكنها تساعدك أن تتفاداه.</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/65 lg:mx-0"
          >
            ابدأ من الرابط التالي الذي يصلك. توقف، افحص، ثم قرر. هذه العادة الصغيرة تصنع فرقاً كبيراً.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <a href="#top" className="btn-primary">
              <span>راجع التجربة</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
