import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const THREATS = [
  { label: "رابط مشبوه", tone: "danger" },
  { label: "كلمة سر مسروقة", tone: "danger" },
  { label: "رسالة بنك مزيفة", tone: "danger" },
  { label: "تطبيق ضار", tone: "warn" },
  { label: "رمز OTP", tone: "warn" },
  { label: "إعلان خادع", tone: "warn" },
];

const LESSONS = [
  {
    title: "التصيد",
    body: "تعرّف على الروابط والرسائل التي تحاول استعجالك قبل أن تفكر.",
    color: "text-cyber-200",
  },
  {
    title: "كلمات السر",
    body: "ابنِ عادات بسيطة تحمي حساباتك حتى عند تسريب موقع تستخدمه.",
    color: "text-signal-safe",
  },
  {
    title: "الاحتيال المالي",
    body: "افهم علامات الخطر في المكالمات والرسائل قبل مشاركة أي معلومة.",
    color: "text-signal-warn",
  },
];

export default function BookOrbit() {
  const reduced = useReducedMotion();

  return (
    <section id="book" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="text-center lg:text-right">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-300" />
            دليل النجاة الرقمي
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
          >
            كتاب واحد يحوّل الخطر الرقمي إلى <span className="text-glow text-cyber-200">قرار واضح</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/65 lg:mx-0"
          >
            تفادى لا يكتفي بالتحذير. يدرّبك على قراءة الإشارة، التوقف للحظة، واتخاذ التصرف الصحيح قبل الضغط.
          </motion.p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {LESSONS.map((lesson, i) => (
              <motion.div
                key={lesson.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="glass group rounded-2xl p-4 text-right transition hover:-translate-y-1 hover:border-cyber-200/25"
              >
                <div className={`text-sm font-black ${lesson.color}`}>{lesson.title}</div>
                <p className="mt-1 text-sm leading-7 text-white/68">{lesson.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(123,228,255,0.12)" strokeWidth="0.35" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(57,240,160,0.16)" strokeWidth="0.35" strokeDasharray="1 1.8" />
            <path d="M8 50h84M50 8v84" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
          </svg>

          {!reduced && (
            <div className="orbit absolute inset-0">
              {THREATS.map((threat, i) => (
                <ThreatChip key={threat.label} label={threat.label} tone={threat.tone} angle={(i * 360) / THREATS.length} />
              ))}
            </div>
          )}

          <div className="absolute inset-0 grid place-items-center">
            <InteractiveBook />
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreatChip({ label, tone, angle }: { label: string; tone: string; angle: number }) {
  const isDanger = tone === "danger";
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(46%) rotate(${-angle}deg)` }}
    >
      <div className="counter-spin">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2 + (angle % 2), repeat: Infinity, ease: "easeInOut" }}
          className="rounded-2xl border px-3 py-2 text-xs font-bold backdrop-blur-md sm:text-sm"
          style={{
            color: isDanger ? "#ffd9e2" : "#fff1d6",
            borderColor: isDanger ? "rgba(255,59,107,0.4)" : "rgba(255,182,72,0.4)",
            background: isDanger ? "rgba(255,59,107,0.12)" : "rgba(255,182,72,0.12)",
            boxShadow: isDanger ? "0 0 32px rgba(255,59,107,0.3)" : "0 0 32px rgba(255,182,72,0.25)",
          }}
        >
          {label}
        </motion.div>
      </div>
    </div>
  );
}

function InteractiveBook() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(6);
  const ry = useMotionValue(-22);
  const rxs = useSpring(rx, { stiffness: 120, damping: 14, mass: 0.4 });
  const rys = useSpring(ry, { stiffness: 120, damping: 14, mass: 0.4 });
  const transform = useTransform([rxs, rys], ([x, y]) => `rotateX(${x}deg) rotateY(${y}deg)`);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    ry.set(-22 + ((e.clientX - cx) / (r.width / 2)) * 12);
    rx.set(6 - ((e.clientY - cy) / (r.height / 2)) * 10);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { ry.set(-22); rx.set(6); }} className="relative" style={{ perspective: "1400px" }}>
      <motion.div className="relative" style={{ transformStyle: "preserve-3d", transform }}>
        <div className="absolute right-[-12px] top-0 h-full w-[26px] book-edge" style={{ transform: "rotateY(90deg) translateZ(13px)", borderRadius: 4 }} />
        <div
          className="book-cover relative h-[300px] w-[210px] overflow-hidden rounded-[8px] sm:h-[360px] sm:w-[252px]"
          style={{
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,228,255,0.2), inset 0 0 60px rgba(62,211,255,0.10)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(123,228,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(123,228,255,0.10)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30" />
          <div className="relative flex h-full flex-col items-center justify-between p-6 sm:p-7">
            <div className="text-[10px] font-bold text-cyber-200/80">SURVIVAL · 01</div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <svg viewBox="0 0 64 64" className="mb-5 h-16 w-16" fill="none">
                <defs>
                  <linearGradient id="shieldBook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e6fbff" />
                    <stop offset="100%" stopColor="#39f0a0" />
                  </linearGradient>
                </defs>
                <path d="M32 4 L56 14 V32 C56 46 44 56 32 60 C20 56 8 46 8 32 V14 Z" fill="url(#shieldBook)" />
                <path d="M22 32 L29 39 L43 25" stroke="#04060c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="hero-word text-5xl font-black sm:text-6xl">تفادى</div>
              <div className="mt-3 max-w-[190px] text-center text-xs leading-7 text-white/65">
                دليلك للنجاة من الفخاخ الرقمية اليومية
              </div>
            </div>
            <div className="flex w-full items-center justify-between text-[9px] text-white/40">
              <span>CYBER · AR</span>
              <span>EDITION I</span>
            </div>
          </div>
          <motion.div
            className="pointer-events-none absolute -inset-1 rotate-[18deg]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)", width: "60%" }}
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
