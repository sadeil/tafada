import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Outcome = null | "trap" | "safe";

const MESSAGE = "شوف صورتك هنا 📸";
const LINK = "http://my-photos.win/?id=8842";

export default function MiniTest() {
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [typed, setTyped] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!started && !reduced) return;
    if (reduced) {
      setTyped(MESSAGE);
      setShowLink(true);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) {
        clearInterval(id);
        window.setTimeout(() => setShowLink(true), 300);
      }
    }, 60);
    return () => clearInterval(id);
  }, [started, reduced]);

  return (
    <section id="test" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="label-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal-warn" />
            اختبر حدسك الرقمي
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl"
          >
            هل كنت <span className="text-glow text-cyber-200">ستتفادى</span> هذا الفخ؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/58 sm:text-base"
          >
            القرار السليم يبدأ بسؤال واحد: هل الرابط منطقي وآمن فعلاً؟
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          onViewportEnter={() => setStarted(true)}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,340px]">
            <ScenarioCard
              typed={typed}
              showLink={showLink}
              outcome={outcome}
              onChoice={setOutcome}
              onReset={() => setOutcome(null)}
            />
            <SidePanel outcome={outcome} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScenarioCard({
  typed,
  showLink,
  outcome,
  onChoice,
  onReset,
}: {
  typed: string;
  showLink: boolean;
  outcome: Outcome;
  onChoice: (o: Outcome) => void;
  onReset: () => void;
}) {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-5 shadow-glow-soft sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyber-200/60 to-transparent" />

      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyber-100 to-cyber-400 text-sm font-black text-ink-950">
          ص
        </div>
        <div>
          <div className="text-sm font-bold text-white">صديقك على واتساب</div>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <motion.span animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.2, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-signal-safe" />
            <span>متصل · قبل ثوان</span>
          </div>
        </div>
      </div>

      <div className="max-w-lg">
        <AnimatePresence mode="wait">
          {typed.length === 0 ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-fit rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-2 w-2 rounded-full bg-white/55" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl rounded-tr-sm border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white/90 sm:text-lg"
            >
              <div>
                {typed}
                {typed.length < MESSAGE.length && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.7, repeat: Infinity }} className="ms-0.5 inline-block h-4 w-0.5 -translate-y-0.5 bg-cyber-200" />}
              </div>
              {showLink && (
                <motion.a
                  href={LINK}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  onClick={(e) => e.preventDefault()}
                  className="mt-2 block break-all text-left text-sm text-cyber-200 underline decoration-dotted underline-offset-4"
                  dir="ltr"
                >
                  {LINK}
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLink && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-7 text-sm leading-7 text-white/65 sm:text-base">
          وصلك رابط غريب من شخص تعرفه. ماذا تفعل؟
        </motion.p>
      )}

      <AnimatePresence mode="wait">
        {outcome === null ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showLink ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <ChoiceButton label="أضغط الرابط" sub="أثق بالمرسل مباشرة" tone="danger" onClick={() => onChoice("trap")} />
            <ChoiceButton label="أتأكد أولاً" sub="أسأل صديقي من قناة أخرى" tone="safe" onClick={() => onChoice("safe")} />
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55 }} className="mt-6">
            <ResultCard outcome={outcome} onReset={onReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidePanel({ outcome }: { outcome: Outcome }) {
  const text =
    outcome === "trap"
      ? "حتى لو جاء الرابط من شخص تعرفه، قد يكون حسابه مخترقاً. تحقّق من المرسل والرابط قبل أي ضغط."
      : outcome === "safe"
        ? "قرار صحيح. التحقق عبر قناة أخرى يحوّل الشك إلى عادة حماية عملية."
        : "اقرأ المرسل، اقرأ الرابط، واسأل قبل الضغط. ثلاث خطوات تكفي غالباً لتفادي الخطر.";

  return (
    <div className="grid gap-4">
      <div className="glass rounded-2xl p-5">
        <div className="text-xs font-black text-cyber-200">واقع الأرقام</div>
        <div className="mt-4 space-y-4">
          {[
            ["محاولات تصيد يومية", "+12,000"],
            ["تنجح عند الاستعجال", "1 من 3"],
            ["وقت قرار خاطئ", "ثانية"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
              <span className="text-xs text-white/60 sm:text-sm">{label}</span>
              <span className="text-lg font-black text-white sm:text-xl">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <motion.div key={outcome || "idle"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass rounded-2xl p-5">
        <div className="text-xs font-black text-cyber-200">نصيحة سريعة</div>
        <p className="mt-3 text-sm leading-8 text-white/75 sm:text-base">{text}</p>
      </motion.div>
    </div>
  );
}

function ChoiceButton({ label, sub, tone, onClick }: { label: string; sub: string; tone: "danger" | "safe"; onClick: () => void }) {
  const isDanger = tone === "danger";
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border p-4 text-right transition"
      style={{
        background: isDanger ? "rgba(255,59,107,0.08)" : "rgba(57,240,160,0.08)",
        borderColor: isDanger ? "rgba(255,59,107,0.35)" : "rgba(57,240,160,0.35)",
      }}
    >
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <div className="text-base font-extrabold text-white sm:text-lg">{label}</div>
          <div className="mt-0.5 text-xs text-white/55 sm:text-sm">{sub}</div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: isDanger ? "rgba(255,59,107,0.22)" : "rgba(57,240,160,0.22)", color: isDanger ? "#ffd9e2" : "#cdf8e3" }}>
          {isDanger ? "!" : "✓"}
        </div>
      </div>
    </motion.button>
  );
}

function ResultCard({ outcome, onReset }: { outcome: "trap" | "safe"; onReset: () => void }) {
  const isTrap = outcome === "trap";
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        background: isTrap ? "rgba(255,59,107,0.10)" : "rgba(57,240,160,0.10)",
        borderColor: isTrap ? "rgba(255,59,107,0.45)" : "rgba(57,240,160,0.45)",
      }}
    >
      <div className="text-xl font-extrabold sm:text-2xl" style={{ color: isTrap ? "#ffd9e2" : "#cdf8e3" }}>
        {isTrap ? "وقعت في الفخ" : "نجوت"}
      </div>
      <p className="mt-2 text-sm leading-8 text-white/75 sm:text-base">
        {isTrap
          ? "الرابط قد يكون محاولة تصيد. الحسابات المخترقة تُستخدم كثيراً لإرسال روابط تبدو مألوفة."
          : "التحقق قبل الضغط هو أول خطوة للحماية. اسأل المرسل بطريقة أخرى قبل أن تثق بأي رابط."}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button onClick={onReset} className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-cyber-200/40 hover:text-cyber-100">
          أعد المحاولة
        </button>
        <a href="#start" className="rounded-full bg-gradient-to-l from-cyber-100 to-cyber-400 px-5 py-2.5 text-sm font-bold text-ink-950">
          تعلّم كيف تتفادى المزيد
        </a>
      </div>
    </div>
  );
}
