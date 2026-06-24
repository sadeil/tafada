import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Tone = "danger" | "warn";

type Msg = {
  text: string;
  source: string;
  appName: string;
  appIcon: "sms" | "mail" | "bank";
  time: string;
  tone: Tone;
  icon: "bank" | "gift" | "otp";
};

const MESSAGES: Msg[] = [
  {
    text: "مبروك! ربحت جائزة بقيمة 5000 ريال. اضغط هنا لاستلامها قبل انتهاء المهلة.",
    source: "WIN-PROMO · +966 5XX XXX",
    appName: "رسالة SMS",
    appIcon: "sms",
    time: "الآن",
    tone: "warn",
    icon: "gift",
  },
  {
    text: "نحن من البنك. تم رصد محاولة دخول مشبوهة لحسابك. أكد بياناتك فوراً لتجنب الإغلاق.",
    source: "BANK-AL Security",
    appName: "رسالة بنكية",
    appIcon: "bank",
    time: "قبل 12 ثانية",
    tone: "danger",
    icon: "bank",
  },
  {
    text: "رمز التحقق OTP: 384192. لا تشاركه مع أي شخص حتى لو ادعى أنه من البنك.",
    source: "Verification Center",
    appName: "رسالة OTP",
    appIcon: "mail",
    time: "الآن",
    tone: "danger",
    icon: "otp",
  },
];

const ICONS: Record<Msg["icon"], JSX.Element> = {
  bank: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 9 12 4l9 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 11h18v9H3zM3 8h18v3H3zM12 8v12M12 8s-3-4-5-4a2 2 0 1 0 0 4M12 8s3-4 5-4a2 2 0 1 1 0 4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  otp: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 12h2M11 12h2M15 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const APP_ICONS: Record<Msg["appIcon"], JSX.Element> = {
  sms: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v11H8l-4 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 9 12 4l9 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

const PER_MESSAGE_MS = 3000;
export const STORM_DURATION_MS = MESSAGES.length * PER_MESSAGE_MS;

export default function ScamStorm({ done, onSkip }: { done: boolean; onSkip: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (done) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1 < MESSAGES.length ? i + 1 : i));
    }, PER_MESSAGE_MS);
    return () => clearInterval(id);
  }, [done]);

  if (done) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,228,255,0.55),transparent_65%)]"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      <div className="absolute left-0 right-0 top-24 z-30 flex items-center justify-between px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 rounded-full border border-signal-danger/40 bg-signal-danger/10 px-3 py-1.5 text-[10px] font-bold text-signal-danger backdrop-blur-md sm:text-xs"
        >
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-signal-danger"
          />
          محاولة احتيال {index + 1} من {MESSAGES.length}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={onSkip}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/75 backdrop-blur-md transition hover:border-cyber-200/40 hover:text-cyber-100 sm:text-xs"
        >
          <span>تخطي المقدمة</span>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      <div className="absolute inset-0 grid place-items-center px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.88, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, scale: 0.94, filter: "blur(10px)", transition: { duration: 0.4 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <NotificationCard msg={MESSAGES[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5">
        {MESSAGES.map((_, i) => (
          <div key={i} className="relative h-1.5 overflow-hidden rounded-full">
            <div className="block h-full rounded-full bg-white/15" style={{ width: i === index ? 48 : 22 }} />
            {i === index && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: PER_MESSAGE_MS / 1000, ease: "linear" }}
                className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-cyber-300 to-signal-safe"
              />
            )}
            {i < index && <div className="absolute inset-0 rounded-full bg-cyber-200/70" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ msg }: { msg: Msg }) {
  const isDanger = msg.tone === "danger";
  const tone = {
    accent: isDanger ? "#ff3b6b" : "#ffb648",
    color: isDanger ? "#ffe6ec" : "#fff4dc",
    subColor: isDanger ? "#ffb3c2" : "#ffdba0",
    border: isDanger ? "rgba(255,59,107,0.55)" : "rgba(255,182,72,0.55)",
    bg: isDanger
      ? "linear-gradient(150deg, rgba(255,59,107,0.18), rgba(8,12,22,0.94))"
      : "linear-gradient(150deg, rgba(255,182,72,0.18), rgba(8,12,22,0.94))",
    tag: isDanger ? "احتيال" : "خداع",
    stamp: isDanger ? "خطر" : "تحذير",
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: 18 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-3 -top-4 z-30 sm:-left-6 sm:-top-6"
      >
        <div
          className="rounded-2xl border-2 px-3 py-1.5 text-[11px] font-black backdrop-blur-md sm:text-xs"
          style={{ color: tone.color, borderColor: tone.accent, background: `${tone.accent}25` }}
        >
          {tone.stamp} · تم الرصد
        </div>
      </motion.div>

      <div
        className="relative overflow-hidden rounded-[28px] border backdrop-blur-2xl"
        style={{
          background: tone.bg,
          borderColor: tone.border,
          boxShadow: `0 34px 100px rgba(0,0,0,0.62), 0 0 80px ${tone.accent}40`,
        }}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-2.5 text-[10px] text-white/45">
          <span>{msg.time}</span>
          <span>تفادى · فحص مباشر</span>
        </div>

        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "320%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, delay: 0.25, ease: "easeInOut" }}
          className="pointer-events-none absolute left-0 right-0 z-10 h-12"
          style={{ background: `linear-gradient(180deg, transparent, ${tone.accent}55, transparent)` }}
        />

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="grid h-11 w-11 flex-none place-items-center rounded-2xl"
                style={{ background: `${tone.accent}25`, color: tone.color, boxShadow: `inset 0 0 0 1px ${tone.border}` }}
              >
                <span className="h-5 w-5">{ICONS[msg.icon]}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/45">
                  <span className="h-3 w-3" style={{ color: tone.subColor }}>
                    {APP_ICONS[msg.appIcon]}
                  </span>
                  {msg.appName}
                </div>
                <div className="truncate text-sm font-bold" style={{ color: tone.subColor }}>
                  {msg.source}
                </div>
              </div>
            </div>
            <div className="flex-none rounded-full border px-2.5 py-1 text-[10px] font-black" style={{ borderColor: tone.border, color: tone.color, background: `${tone.accent}22` }}>
              {tone.tag}
            </div>
          </div>

          <div className="text-base font-bold leading-[1.85] sm:text-lg" style={{ color: tone.color }}>
            {msg.text}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            <div className="flex items-center gap-2 text-[11px] text-white/50 sm:text-xs">
              <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: `${tone.accent}20`, color: tone.accent }}>
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v5M12 16.5v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span>رصد تفادى: محاولة تصيد</span>
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold sm:text-xs" style={{ color: tone.color }}>
              لا تضغط
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-4 right-4 top-1/2 z-20 origin-right -translate-y-1/2 rounded-full"
          style={{ height: 3, background: `linear-gradient(90deg, transparent, ${tone.accent}, transparent)`, boxShadow: `0 0 16px ${tone.accent}aa` }}
        />
      </div>
    </div>
  );
}
