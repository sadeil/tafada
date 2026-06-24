import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-5 sm:mt-6 sm:px-8">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-glow-soft sm:rounded-full sm:px-5">
          <a href="#top" className="flex items-center gap-2" aria-label="تفادى">
            <span
              className="grid h-8 w-8 place-items-center rounded-xl sm:rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #e6fbff 0%, #3ed3ff 52%, #18b76d 100%)",
                boxShadow: "0 0 24px rgba(62,211,255,0.5)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-ink-950">
                <path
                  d="M12 2 L20 5 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V5 Z"
                  fill="currentColor"
                />
                <path
                  d="M8.5 12 L11 14.5 L15.5 9.5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-lg font-extrabold text-glow">تفادى</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            <a href="#book" className="transition hover:text-cyber-200">
              الدليل
            </a>
            <a href="#test" className="transition hover:text-cyber-200">
              الاختبار
            </a>
            <a href="#start" className="transition hover:text-cyber-200">
              ابدأ
            </a>
          </nav>

          <a href="#start" className="hidden sm:inline-flex">
            <span className="rounded-full border border-cyber-200/40 bg-cyber-200/5 px-4 py-2 text-sm font-semibold text-cyber-100 transition hover:bg-cyber-200/15">
              ابدأ الرحلة
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
